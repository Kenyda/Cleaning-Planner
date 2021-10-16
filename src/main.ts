import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import '@/assets/styles.scss';

import '@/service_worker/registerServiceWorker';
import store from '@/store';

import router from '@/router';

import registerInterceptors from '@/api/interceptors';

import App from '@/App.vue';

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) {
    next({ path: '/authorization/login' });
  }
  next();
});

registerInterceptors();

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
