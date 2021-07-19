import Component from '../../core/Component';
import TextInput from './../Shared/TextInput/index';
import Button from './../Shared/Button/index';
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

    const form = this.$target.querySelector('#login-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    new TextInput($userLogin as HTMLElement, {
      type: 'text',
      placeholder: '닉네임을 입력하세요.',
      size: 'large',
      id: 'userId',
    });

    const handleLogin = () => {
      const value = $userIdInput.value;
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: value,
        }),
      })
        .then((res) => res.json())
        .then(({ accessToken }) => {
          localStorage.setItem('token', accessToken);
        });
    };

    new Button($loginBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그인',
      handleClick: handleLogin,
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
