import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import Login from './Login';

export default class Auth extends Component {
  setup() {}

  template() {
    return `
      <header></header>
      <form class="authentication"></form>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $authentication = this.$target.querySelector('.authentication');

    new Header($header as HTMLElement, {
      title: '로그인',
      headerType: 'menu-off-white',
    });

    new Login($authentication as HTMLElement);
  }
}
