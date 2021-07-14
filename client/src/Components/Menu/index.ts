import { $router } from '../../lib/router';
import Component from '../../core/Component';
import Header from '../shared/Header';
import Button from '../shared/Button';
import './styles.scss';

const tapList = [
  { id: 'sell-list', title: '판매목록' },
  { id: 'chat-list', title: '채팅' },
  { id: 'like-list', title: '관심목록' },
];

export default class Menu extends Component {
  setup() {
    this.$state = { menu: 'sell-list' };
  }

  template() {
    return `
    <header></header>
    <div id="tap-bar"></div>
    <div class="menu-wrapper"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '메뉴',
      headerType: 'menu-off-white',
    });

    const $tapBar = this.$target.querySelector('#tap-bar');
    tapList.forEach((tap) => {
      const btn = document.createElement('div');
      btn.id = tap.id;
      new Button(btn as Element, {
        buttonType: 'tap',
        title: tap.title,
        isClicked: this.$state.menu === btn.id,
        handleClick: () => {
          this.setState({ menu: tap.id });
          console.log(this.$state.menu);
        },
      });
      $tapBar?.append(btn);
    });
  }
}
