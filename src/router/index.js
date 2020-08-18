import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/layout/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/layout/Product.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/layout/Cart.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/dashboard/Products.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/dashboard/Coupons.vue'),
      },
    ],
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

export default router;
