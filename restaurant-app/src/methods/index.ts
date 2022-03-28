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

  static async getCategories(): Promise<Category[]> {
    const api = await this.isApiUrlAvailable(data.apiUrl).then() ? data.apiUrl : data.apiUrlForDev;
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

  static async getMenu(): Promise<FoodMenuItem[]> {
    const api = await this.isApiUrlAvailable(data.apiUrl).then() ? data.apiUrl : data.apiUrlForDev;
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
}