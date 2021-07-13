// import { $router } from '../lib/router.js';

import Component from '../../../core/Component';
import './Header.scss';

type HeaderType = 'main' | 'menu-white' | 'menu-off-white' | 'menu-invisible';
interface HeaderProps {
  headerType: HeaderType;
  title?: string;
}

export default class Header extends Component {
  template() {
    const { headerType, title }: HeaderProps = this.$props;

    let template = '';

    switch (headerType) {
      case 'main':
        template = `<div class="header main"><div>${title}</div></div>`;
        break;

      case 'menu-white':
        template = `<div class="header menu-white"><div>${title}</div></div>`;
        break;

      case 'menu-off-white':
        template = `<div class="header menu-off-white"><div>${title}</div></div>`;
        break;

      case 'menu-invisible':
        template = `<div class="header menu-invisible" />`;
        break;

      default:
        break;
    }
    return template;
  }
}
