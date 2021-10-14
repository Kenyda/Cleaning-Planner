import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import AuthorizationLayout from '@/pages/Layout/AuthorizationLayout.vue';
import LoginComponent from '@/pages/Authorization/LoginComponent.vue';
import ResetPasswordComponent from '@/pages/Authorization/ResetPasswordComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/authorization',
    redirect: '/authorization/login',
    component: AuthorizationLayout,
    meta: {
      guest: true,
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginComponent,
        meta: {
          guest: true,
        },
      },
      {
        path: 'reset_password',
        name: 'Reset Password',
        component: ResetPasswordComponent,
        meta: {
          guest: true,
          no_need_profile: true,
        },
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
