import Component from '../../core/Component';
import TextInput from './../Shared/TextInput/index';
import Button from './../Shared/Button/index';
import { $router } from '../../lib/router';

export default class Login extends Component {
  template() {
    return `
      <div class="user-email"></div>
      <div class="login-btn"></div>
      <span class="link-to-register">회원가입</span>
    `;
  }

  mounted() {
    const $userLogin = this.$target.querySelector('.user-email');
    const $loginBtn = this.$target.querySelector('.login-btn');

    new TextInput($userLogin as HTMLElement, {
      type: 'email',
      placeholder: '아이디를 입력하세요.',
      size: 'large',
    });

    new Button($loginBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그인',
      handleClick: () => console.log('로그인 폼 제출!'),
    });
  }

  setEvent() {
    this.addEvent('click', '.link-to-register', () =>
      $router.push('/register')
    );
  }
}
