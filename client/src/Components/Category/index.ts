// import { $router } from '../lib/router.js';

import Component from '../../core/Component';
import Header from '../shared/Header';

export default class Category extends Component {
  template() {
    return `
            <header data-component="header"></header>
            <div>Category</div>
          `;
  }
  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    new Header($header as Element);
  }
}
