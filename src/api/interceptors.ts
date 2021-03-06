import fetchIntercept from 'fetch-intercept';

import store from '@/store';
import router from '@/router';

export default function registerInterceptors() {
  fetchIntercept.register({
    request(url, config) {
      // Modify the url or config here
      return [url, config];
    },

    requestError(error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response(response) {
      if (response.status === 401) {
        store.dispatch('logout');

        router.push('/');
      }
      // Modify the reponse object
      return response;
    },

    responseError(error) {
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
}
