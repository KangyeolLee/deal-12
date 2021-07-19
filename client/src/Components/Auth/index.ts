import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import Login from './Login';
import Logout from './Logout';
import { token } from '../../lib/util';

export default class Auth extends Component {
  template() {
    return `
      <header></header>
      <div class="authentication"></div>
    `;
  }

  mounted() {
    const isLogin = token();

    const $header = this.$target.querySelector('header');
    const $authentication = this.$target.querySelector('.authentication');

    const title = !isLogin ? '로그인' : '내 계정';
    if (!isLogin) {
      new Header($header as HTMLElement, {
        title,
        headerType: 'menu-off-white',
      });

      new Login($authentication as HTMLElement);
    } else {
      new Header($header as HTMLElement, {
        title,
        headerType: 'menu-off-white',
      });

      new Logout($authentication as HTMLElement);
    }

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
