import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthorizationLayout from '@/pages/Layout/AuthorizationLayout.vue';
import ContentLayout from '@/pages/Layout/ContentLayout.vue';
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
    name: 'ContentLayout',
    component: ContentLayout,
  },
  {
    path: '/room/create',
    name: 'Create Room',
    component: () => import(/* webpackChunkName: "about" */ '../components/Room/CreateComponent.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
