import {data} from './data';
import {Category, FoodMenuItem} from '../types';

export class Methods {

  static async isApiUrlAvailable(url: string): Promise<boolean> {
    return new Promise(resolve => {
      fetch(url + '?func=test')
        .then(async (response) => {
          const data = await response.text();
          resolve(data === 'OK');
        })
        .catch(() => {
          resolve(false);
        });
    });
  }

  static async getApi(): Promise<string> {
    const api = await this.isApiUrlAvailable(data.apiUrl).then() ? data.apiUrl : data.apiUrlForDev;
    return new Promise(resolve => resolve(api));
  }

  static async getCategories(api: string): Promise<Category[]> {
    
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve([]));
    }
    return new Promise(resolve => {
      fetch(api + '?func=get_categories')
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  static async getMenu(api: string): Promise<FoodMenuItem[]> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve([]));
    }
    return new Promise(resolve => {
      fetch(api + '?func=get_menu')
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  static author = async (url: string, pass: string, showError: (text: string) => void): Promise<string | null> => {
    return new Promise(resolve => {
      fetch(url + '?func=author', {
        method: 'post', 
        body: JSON.stringify({pass})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 100) {
              showError('Неверный пароль');
            }
            resolve(null);
            return;
          } 
          const done = await this.authent(url, data.session_id, showError).then();
          if (done) {
            resolve(data.session_id);
          } else {
            resolve(null);
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  };

  static authent = async (url: string, session_id: string, showError?: (text: string) => void): Promise<boolean> => {
    return new Promise(resolve => {
      
      fetch(url + '?func=authent', {
        method: 'post', 
        body: JSON.stringify({session_id: session_id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              localStorage.removeItem('token');
            } else {
              !!showError && showError('Ошибка на сервере');
            }
            resolve(false);
          } 
          if (data.status === 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          resolve(false);
        });
    });     
  };

  static logout = async (url: string, session_id: string) => {
    fetch(url + '?func=logout', {
      method: 'post', 
      body: JSON.stringify({session_id: session_id})
    });
  };

}
