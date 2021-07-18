import './styles';
import Component from '../../core/Component';
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
      <form id="logout-form">
        <div class="user-nickname">${this.$state.username}</div>
        <div class="logout-btn"></div>
      </form>
    `;
  }

  mounted() {
    const $logoutBtn = this.$target.querySelector('.logout-btn');

    new Button($logoutBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그아웃',
      handleClick: () => console.log('로그아웃 폼 제출!'),
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      $router.push('/home');
    });
  }
}
