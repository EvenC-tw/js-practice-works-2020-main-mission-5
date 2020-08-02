import Vue from 'vue';
import VueRouter from 'vue-router';

// client
import cart from '@/views/layout/Cart.vue';
import layout from '@/views/layout/Layout.vue';
import product from '@/views/layout/Product.vue';
import products from '@/views/layout/Products.vue';

// admin
import adminCoupons from '@/views/dashboard/Coupons.vue';
import adminProducts from '@/views/dashboard/Products.vue';
import dashboard from '@/views/dashboard/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: layout,
    children: [
      {
        path: 'products',
        name: 'products',
        component: products,
      },
      {
        path: 'product/:id',
        name: 'product',
        component: product,
      },
      {
        path: 'cart',
        name: 'cart',
        component: cart,
      },
    ],
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: dashboard,
    children: [
      {
        path: 'products',
        name: 'admin.products',
        component: adminProducts,
      },
      {
        path: 'coupons',
        name: 'admin.coupons',
        component: adminCoupons,
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
