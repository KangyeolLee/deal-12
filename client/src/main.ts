import Category from './Components/Category';
import Home from './Components/Home';
import { initRouter } from './lib/router';

const $app = document.querySelector('#app');
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  // { path: '/login', component: LoginPage },
  // { path: '/stores', component: StorePage },
];

async function init() {
  initRouter({ $app, routes });
}
init();
