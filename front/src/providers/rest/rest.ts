// Rest api need be define here
// import { Auth } from '../../types';
import axios from 'axios';
import Domain from '../../environement/environement';
// import { ICatResponse } from '../../types/index';

export default class RestProvider {
  // Private constante
  private apiUrl: string;
  private $http: any;
  private jsonHeader = {
    'Content-Type': 'application/json',
  };

  constructor() {
    this.apiUrl = Domain;
    this.$http = axios;
  }

  // REST: Get cat list

  public getCats(): Promise<any[]> {
    const headers = this.jsonHeader;

    return new Promise((resolve, reject) => {
      this.$http.get(this.apiUrl + '/cats', { headers })
        .then((res: any) => {
          if (res.status && (res.data.status === 200)) {
            resolve(res.data.response);
          } else {
            // console.error('Failed to load profile:', res);
            reject('Error request failed to load cat');
          }
        })
        .catch((err: any) => {
          // console.info('Failed to load profile:', err);
          reject(err);
        });
    });

  }
}
