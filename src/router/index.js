import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/layout/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/layout/Product.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/layout/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'admin.products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'coupons',
        name: 'admin.coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
