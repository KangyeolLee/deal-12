import './styles';
import Component from '../../core/Component';
import Header from './../Shared/Header/index';
import Button from './../Shared/Button/index';
import { $router } from '../../lib/router';

export default class Logout extends Component {
  setup() {
    this.$state = {
      username: '우아해지고 싶은 사람',
    };
  }
  template() {
    return `
      <header></header>
      <form class="authentication">
        <div class="user-nickname">${this.$state.username}</div>
        <div class="logout-btn"></div>
      </form>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $logoutBtn = this.$target.querySelector('.logout-btn');

    new Header($header as HTMLElement, {
      title: '내 계정',
      headerType: 'menu-off-white',
    });

    new Button($logoutBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그아웃',
      handleClick: () => console.log('로그아웃 폼 제출!'),
    });
  }

  setEvent() {
    this.addEvent('click', '#left', () => $router.push('/home'));
  }
}
