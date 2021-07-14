import './styles';
import Component from '../../core/Component';
import TextInput from './../Shared/TextInput/index';
import Button from './../Shared/Button/index';
import Header from './../Shared/Header/index';
import { $router } from '../../lib/router';

export default class Register extends Component {
  template() {
    return `
      <header></header>
      <form class="authentication">
        <label for="userId">아이디
          <div class="user-email"></div>
        </label>

        <label for="userLoc">우리 동네
          <div class="user-location"></div>     
        </label>

        <div class="register-btn"></div>
      </form>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $userEmail = this.$target.querySelector('.user-email');
    const $userLocation = this.$target.querySelector('.user-location');
    const $registerBtn = this.$target.querySelector('.register-btn');

    new Header($header as HTMLElement, {
      title: '회원가입',
      headerType: 'menu-off-white',
    });

    new TextInput($userEmail as HTMLElement, {
      type: 'email',
      placeholder: '영문, 숫자 조합 20자 이하',
      size: 'large',
      id: 'userId',
    });

    new TextInput($userLocation as HTMLElement, {
      type: 'text',
      placeholder: '시·구 제외, 동만 입력',
      size: 'large',
      id: 'userLoc',
    });

    new Button($registerBtn as HTMLElement, {
      buttonType: 'large',
      title: '회원가입',
      handleClick: () => console.log('회원가입 폼 제출!'),
    });
  }

  setEvent() {
    this.addEvent('click', '#left', () => $router.push('/home'));
  }
}
