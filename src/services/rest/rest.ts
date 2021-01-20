import axios from 'axios';
import { API_ENDPOINT } from '_base/config';
import store from '_store/store';
import { ACTION_STATES, ACTION_TYPES } from '_store/store.constants';
import type { AxiosInstance } from 'axios';
import type { FSA } from '_store/store.types';

class Rest {
  private _axios: AxiosInstance;

  /**
   * Creates axios instance with the
   */
  constructor() {
    const axiosConfig = {
      baseURL: API_ENDPOINT,
      timeout: 1000,
    };
    this._axios = axios.create(axiosConfig);
  }

  get(route: string, data: any = undefined) {
    const method = 'GET';
    this._axios
      .request({
        method,
        url: route,
        data,
      })
      .then((axiosResponse) => {
        // !any
        store.dispatch<FSA<any>>({
          type: ACTION_TYPES.REST_RESPONSE,
          state: ACTION_STATES.SUCCESS,
          payload: axiosResponse.data,
        });
      });
  }
}

export default new Rest();
