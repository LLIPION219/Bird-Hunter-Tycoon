import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import HuntPage from '@/pages/HuntPage.vue';
import InventoryPage from '@/pages/InventoryPage.vue';
import ShopPage from '@/pages/ShopPage.vue';
import MarketPage from '@/pages/MarketPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hunt',
    name: 'Hunt',
    component: HuntPage,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryPage,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopPage,
  },
  {
    path: '/market',
    name: 'Market',
    component: MarketPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
