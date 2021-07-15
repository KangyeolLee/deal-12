import './scss/index.scss';
import { initRouter } from './lib/router';
import Home from './Components/Home';
import SalesProductDetail from './Components/SalesProductDetail';
import Chatlist from './Components/ChatList/index';
import ChatDetail from './Components/ChatDetail';
import NewPost from './Components/NewPost';
import Register from './Components/Auth/Register';
import Logout from './Components/Auth/Logout';
import Location from './Components/Location';

const $app = document.querySelector('#app');
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/post', component: SalesProductDetail },
  { path: '/post/:id', component: SalesProductDetail },
  { path: '/post/new', component: NewPost },
  { path: '/chat', component: Chatlist },
  { path: '/chat/:id', component: ChatDetail },
  { path: '/register', component: Register },
  { path: '/logout', component: Logout },
  { path: '/location', component: Location },
  // { path: '/login', component: LoginPage },
  // { path: '/stores', component: StorePage },
];

async function init() {
  initRouter({ $app, routes });
}
init();
