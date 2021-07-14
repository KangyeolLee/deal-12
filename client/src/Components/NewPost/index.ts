import Header from '../Shared/Header';
import Component from '../../core/Component';
import './styles.scss';

export default class Home extends Component {
  // setup() {
  //   this.$state = {
  //     isMenuOpened: false,
  //     isCategoryOpened: false,
  //     isUserOpened: false,
  //   };
  // }
  template() {
    return `
    <header></header>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '글쓰기',
      headerType: 'menu-white',
      extraIconName: 'check',
    });
  }
}
