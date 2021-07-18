import Component from '../../core/Component';
import TextInput from './../Shared/TextInput/index';
import Button from './../Shared/Button/index';
import { $router } from '../../lib/router';
import Register from './Register';

export default class Login extends Component {
  template() {
    return `
      <form id="login-form">
        <div class="user-email"></div>
        <div class="login-btn"></div>
        <span class="link-to-register">회원가입</span>
      </form>
      <div id="register-modal" class="modal-close"></div>
    `;
  }

  mounted() {
    const $userLogin = this.$target.querySelector('.user-email');
    const $loginBtn = this.$target.querySelector('.login-btn');
    const $modal = this.$target.querySelector('#register-modal');

    new TextInput($userLogin as HTMLElement, {
      type: 'email',
      placeholder: '아이디를 입력하세요.',
      size: 'large',
      id: 'userId',
    });

    new Button($loginBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그인',
      handleClick: () => console.log('로그인 폼 제출!'),
    });

    const $button = $loginBtn?.querySelector('#button') as HTMLButtonElement;
    $button.disabled = true;

    const $userIdInput = this.$target.querySelector(
      'input#userId'
    ) as HTMLInputElement;
    $userIdInput.addEventListener('input', () => {
      const isActivated = $userIdInput.value;
      $button.disabled = isActivated ? false : true;
    });

    new Register($modal as HTMLElement);
  }

  setEvent() {
    this.addEvent('click', '.link-to-register', () => {
      const $registerModal = this.$target.querySelector('#register-modal');
      $registerModal?.classList.remove('modal-close');
      $registerModal?.classList.add('modal-open');
    });
  }
}
