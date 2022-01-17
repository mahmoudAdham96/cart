import Vue from "vue";
import VueRouter from "vue-router";

import ProductsList from '../pages/ProductsList.vue';
import UserCart from '../pages/UserCart.vue';
import ShopAdmin from '../pages/ShopAdmin.vue';


Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products',name:'products', component: ProductsList },
  { path: '/cart', component: UserCart },
  { path: '/admin', component: ShopAdmin },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
