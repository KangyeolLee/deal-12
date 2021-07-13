// import { $router } from '../lib/router.js';

import Component from '../core/Component';
import Header from './shared/Header';

export default class Home extends Component {
  template() {
    return `
    <header></header>
          <div>Home</div>
        `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    console.log($header);
    new Header($header as Element, {
      title: '역삼동',
      headerType: 'main',
    });
  }
}
