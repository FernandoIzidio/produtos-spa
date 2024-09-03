import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import store from '@/store';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { bodyClass: 'home-page', requiresAuth: false },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { bodyClass: 'register-page', requiresAuth: false },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { bodyClass: 'login-page', requiresAuth: false },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { bodyClass: 'dashboard-page', requiresAuth: true },
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/create-product',
    name: 'createProduct',
    meta: { bodyClass: 'create-product-page', requiresAuth: true },
    component: () => import('@/views/CreateProduct.vue')
  },
  {
    path: '/update-product/:id',
    name: 'updateProduct',
    meta: { bodyClass: 'update-product-page', requiresAuth: true },
    component: () => import('@/views/UpdateProduct.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  if (to.meta.requiresAuth && (!store.state.token || !store.state.user)) {
    next({ name: 'login', query:  { sessionExpired: 'true' } });
  } else {
    next();
  }

  const nearestWithMeta = to.matched.slice().reverse().find((r: any) => r.meta && r.meta.bodyClass) as { meta: { bodyClass: string } } | undefined;
  if (nearestWithMeta && nearestWithMeta.meta.bodyClass) {
    document.body.className = nearestWithMeta.meta.bodyClass;
  } else {
    document.body.className = '';
  }
});

export default router;
