import fetchIntercept from 'fetch-intercept';

import store from './store';
import router from './router';

export default function registerInterceptors() {
  fetchIntercept.register({
    request(url, config) {
      // Modify the url or config here
      console.log(url);
      return [url, config];
    },

    requestError(error) {
      console.log(error);
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response(response) {
      console.log(response);
      if (response.status === 401) {
        store.dispatch('saveToken', null);
        localStorage.setItem('token', JSON.stringify(null));
        router.push('/');
      }
      // Modify the reponse object
      return response;
    },

    responseError(error) {
      console.log(error);
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
}
