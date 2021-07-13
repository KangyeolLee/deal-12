// import { $router } from '../lib/router.js';

import Component from '../../../core/Component';
import './styles.scss';

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
        template = `<div class="header main"><div id="category">카테고리</div><div>${title}</div><div id="menu">메뉴</div></div>`;
        break;

      case 'menu-white':
        template = `<div class="header menu-white"><div>${title}</div></div>`;
        break;

      case 'menu-off-white':
        template = `<div class="header menu-off-white"><div id="close">닫기</div><div>${title}</div></div>`;
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
