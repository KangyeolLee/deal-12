import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import Login from './Login';
import Logout from './Logout';

export default class Auth extends Component {
  setup() {
    // 유저의 로그인/아웃 정보는 전역에서 관리를 해야 할까유?
    this.$state = { isLogin: true };
  }

  template() {
    return `
      <header></header>
      <div class="authentication"></div>
    `;
  }

  mounted() {
    const { isLogin } = this.$state;
    const $header = this.$target.querySelector('header');
    const $authentication = this.$target.querySelector('.authentication');

    if (isLogin) {
      new Header($header as HTMLElement, {
        title: '로그인',
        headerType: 'menu-off-white',
      });

      new Login($authentication as HTMLElement);
    } else {
      new Header($header as HTMLElement, {
        title: '내 계정',
        headerType: 'menu-off-white',
      });

      new Logout($authentication as HTMLElement);
    }
  }
}
