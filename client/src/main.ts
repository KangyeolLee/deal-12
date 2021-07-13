import './scss/index.scss';
import { initRouter } from './lib/router';
import Home from './Components/Home';
import SalesProductDetail from './Components/SalesProductDetail';

const $app = document.querySelector('#app');
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/post', component: SalesProductDetail },
  // { path: '/login', component: LoginPage },
  // { path: '/stores', component: StorePage },
];

async function init() {
  initRouter({ $app, routes });
}
init();
