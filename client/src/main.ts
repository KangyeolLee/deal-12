import './scss/index.scss';
import { initRouter } from './lib/router';
import Home from './Components/Home';
import SalesProductDetail from './Components/SalesProductDetail';
import Chatlist from './Components/ChatList/index';
import ChatDetail from './Components/ChatDetail';
import NewPost from './Components/NewPost';
import Location from './Components/Location';
import { io } from 'socket.io-client';
import UpdatePost from './Components/UpdatePost';

export const socket = io('http://3.34.200.100:3000');

const $app = document.querySelector('#app');
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/post', component: SalesProductDetail },
  { path: '/post/:id', component: SalesProductDetail },
  { path: '/post/new', component: NewPost },
  { path: '/post/update/:id', component: UpdatePost },
  { path: '/location', component: Location },
  { path: '/chat/post/:id', component: Chatlist }, // 판매글의 채팅목록
  { path: '/chatroom/:id', component: ChatDetail }, // 채팅룸
];

async function init() {
  initRouter({ $app, routes });
}
init();
