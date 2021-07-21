import './scss/index.scss';
import { initRouter } from './lib/router';
import Home from './Components/Home';
import SalesProductDetail from './Components/SalesProductDetail';
import Chatlist from './Components/ChatList/index';
import ChatDetail from './Components/ChatDetail';
import NewPost from './Components/NewPost';
import Location from './Components/Location';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000');

const $app = document.querySelector('#app');
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/post', component: SalesProductDetail },
  { path: '/post/:id', component: SalesProductDetail },
  { path: '/post/new', component: NewPost },
  { path: '/chat', component: Chatlist },
  { path: '/chat/:id', component: ChatDetail },
  { path: '/location', component: Location },
];

async function init() {
  initRouter({ $app, routes });
}
init();
