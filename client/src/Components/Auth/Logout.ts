import './styles';
import Component from '../../core/Component';
import Button from './../Shared/Button/index';

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
      handleClick: () => {
        localStorage.clear();
        (this.$target.parentNode as Element).className = 'modal-close';
      },
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
