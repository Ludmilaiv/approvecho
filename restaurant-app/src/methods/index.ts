import {data} from './data';
import {Category, FoodMenuItem, Unit, Table, Book} from '../types';

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
          resolve((data as FoodMenuItem[]).reverse());
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
              showError('???????????????? ????????????');
            } else if (data.err.code === 0) {
              showError('???????????? ???? ??????????????');
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
              !!showError && showError('???????????? ???? ??????????????');
            }
            resolve(false);
          } 
          if (data.status === 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          console.error(err);
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

  static addCategory = async (url: string, title: string): Promise<Category | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=add_category', {
        method: 'post', 
        body: JSON.stringify({title})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static addMenuItem = async (url: string, title: string, desc: string, cat_id: number, massa: number, unit: Unit, price: number, img: string): Promise<FoodMenuItem | null> => {
    return new Promise(resolve => {
      fetch(url + '?func=add_menu_item', {
        method: 'post', 
        body: JSON.stringify({
          title,
          desc,
          cat_id,
          massa,
          unit,
          price,
          img
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static uploadImg = async (url: string, file: File, showError: (text: string) => void): Promise<string | null> => {
    return new Promise(resolve => {
      const body = new FormData();
      body.append('img', file);
    
      fetch(url + '?func=upload_img', {method: 'post', body})
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            if (data.err.code == 3 || data.err.code == 4) {
              showError('???????????????????????? ???????????? ??????????. ???????????????????????? ???????????? ??????????. ?????????????????? ?????????????????????? ???????????????? jpeg ?? png');
            }
            resolve(null);
          } else if (data.fileName) {
            resolve(data.fileName);
          } else {
            resolve(null);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static changeMenuItem = async (url: string, id: number, title: string, desc: string, cat_id: number, massa: number, unit: Unit, price: number, img: string): Promise<FoodMenuItem | null> => {
    return new Promise(resolve => {
      fetch(url + '?func=change_menu_item', {
        method: 'post', 
        body: JSON.stringify({
          id,
          title,
          desc,
          cat_id,
          massa,
          unit,
          price,
          img
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  };

  static changeCategory = async (url: string, id: number, title: string): Promise<Category | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=change_category', {
        method: 'post', 
        body: JSON.stringify({title, id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static removeCategory = async (url: string, id: number, showError?: (text: string) => void ): Promise<Category | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=remove_category', {
        method: 'post', 
        body: JSON.stringify({id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            if (data.err.code === 11) {
              showError && showError('???????????????????? ?????????????? ?????? ??????????????????, ?????? ?????? ?? ?????? ???????? ??????????. ?????????????? "????????????????".');
            }
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static removeMenuItem = async (url: string, id: number): Promise<FoodMenuItem | null> => {
    return new Promise(resolve => {
      fetch(url + '?func=remove_menu_item', {
        method: 'post', 
        body: JSON.stringify({id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  };

  static moveCategory = async (url: string, id_1: number, id_2: number): Promise<Category[] | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=move_category', {
        method: 'post', 
        body: JSON.stringify({id_1, id_2})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static moveMenuItem = async (url: string, id_1: number, id_2: number): Promise<Category[] | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=move_menu_item', {
        method: 'post', 
        body: JSON.stringify({id_1, id_2})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static async getTables(api: string): Promise<Table[]> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve([]));
    }
    return new Promise(resolve => {
      fetch(api + '?func=get_tables')
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  static async getEmptyTables(api: string, datetime: number, duration: number): Promise<Table[]> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve([]));
    }
    return new Promise(resolve => {
      fetch(api + '?func=get_empty_tables', {
        method: 'post', 
        body: JSON.stringify({datetime, duration})
      })
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  static async booking(
    api: string, first_name: string, last_name: string, phone: string, datetime: number, 
    duration: number, table_id: number, showError?: (text: string) => void
  ): Promise<Book | null> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      showError && showError('???????????? ???? ??????????????');
      return new Promise(resolve => resolve(null));
    }
    return new Promise(resolve => {
      fetch(api + '?func=booking', {
        method: 'post', 
        body: JSON.stringify({
          first_name, 
          last_name,
          phone,
          datetime,
          duration,
          table_id
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.log(data.err);
            showError && showError('???????????? ???? ??????????????');
            resolve(null);
          }
          resolve(data);
        })
        .catch(() => {
          showError && showError('???????????? ???? ??????????????');
          resolve(null);
        });
    });
  }

  static async confirmBooking(api: string, id: number, code: string, showError?: (text: string) => void): Promise<boolean> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      showError && showError('???????????? ???? ??????????????');
      return new Promise(resolve => resolve(false));
    }
    return new Promise(resolve => {
      fetch(api + '?func=confirm_booking', {
        method: 'post', 
        body: JSON.stringify({id, code})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            if (data.err.code === 11) {
              showError && showError('???????????? ???????????????? ?????? ??????????????????????????');
            } else {
              showError && showError('???????????? ???? ??????????????');
            }
            resolve(false);
          }
          resolve(true);
        })
        .catch(() => {
          showError && showError('???????????? ???? ??????????????');
          resolve(false);
        });
    });
  }

  static async getTablesMap(api: string): Promise<string | undefined> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve(undefined));
    }
    return new Promise(resolve => {
      fetch(api + '?func=get_tables_map')
        .then(async (response) => {
          const data = await response.json();
          resolve(data.fileName);
        })
        .catch(() => {
          resolve(undefined);
        });
    });
  }

  

  static removeTable = async (url: string, id: number, showError?: (text: string) => void ): Promise<Category | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=remove_table', {
        method: 'post', 
        body: JSON.stringify({id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            if (data.err.code === 11) {
              showError && showError('???????????????????? ?????????????? ?????? ??????????????????, ?????? ?????? ?? ?????? ???????? ??????????. ?????????????? "????????????????".');
            }
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static changeTable = async (url: string, id: number, title: string, places: number): Promise<Table | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=change_table', {
        method: 'post', 
        body: JSON.stringify({title, places, id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static addTable = async (url: string, title: string, places: number): Promise<Table | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=add_table', {
        method: 'post', 
        body: JSON.stringify({title, places})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static uploadTablesMap = async (url: string, file: File, showError: (text: string) => void): Promise<string | null> => {
    return new Promise(resolve => {
      const body = new FormData();
      body.append('img', file);
    
      fetch(url + '?func=upload_tables_map', {method: 'post', body})
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            if (data.err.code == 3 || data.err.code == 4) {
              showError('???????????????????????? ???????????? ??????????. ???????????????????????? ???????????? ??????????. ?????????????????? ?????????????????????? ???????????????? jpeg ?? png');
            }
            resolve(null);
          } else if (data.fileName) {
            resolve(data.fileName);
          } else {
            resolve(null);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };
  
  static moveTable = async (url: string, id_1: number, id_2: number): Promise<Table[] | null> => {
    return new Promise(resolve => {
    
      fetch(url + '?func=move_table', {
        method: 'post', 
        body: JSON.stringify({id_1, id_2})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.warn(data.err);
            if (data.err.code === 102) {
              // ???????? ?????????? ??????????????????, ???? ???????????? ????????????
              const token = localStorage.getItem('token');
              token && Methods.logout(url, token);
              localStorage.removeItem('token');
            } 
            resolve(null);
          } else {
            resolve(data);
          }
        })
        .catch(err => {
          console.error(err);
          resolve(null);
        });
    });
  };

  static async getBooking(api: string, start_date?: number, end_date?: number): Promise<Book[]> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve([]));
    }
    return new Promise(resolve => {
      let body = {};
      if (start_date && end_date) {
        body = {start_date, end_date};
      }
      fetch(api + '?func=get_booking', {
        method: 'post', 
        body: JSON.stringify(body)
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.error(data.err);
            resolve([]);
          }
          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  static async removeBook(api: string, id: number): Promise<Book | null> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve(null));
    }
    return new Promise(resolve => {
      fetch(api + '?func=remove_book', {
        method: 'post', 
        body: JSON.stringify({id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.error(data.err);
            resolve(null);
          }
          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  static async recoveryBook(api: string, id: number): Promise<Book | null> {
    if (!await this.isApiUrlAvailable(api).then()) {
      console.error('Server is not available!');
      return new Promise(resolve => resolve(null));
    }
    return new Promise(resolve => {
      fetch(api + '?func=recovery_book', {
        method: 'post', 
        body: JSON.stringify({id})
      })
        .then(async (response) => {
          const data = await response.json();
          if (data.err) {
            console.error(data.err);
            resolve(null);
          }
          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  // ?????????????????? ???????? ?? ?????????????? ?? ???????????????????????? ?????????????? ??????????
  static getDate(timeZone: number) {
    const clientDate = new Date();
    const clientTimeZone = clientDate.getTimezoneOffset() * 60 * 1000;
    const localTimeZone = -timeZone * 60 * 60 * 1000;
    const newDate = new Date(clientDate.getTime() + clientTimeZone - localTimeZone);
    return newDate;
  }
}
