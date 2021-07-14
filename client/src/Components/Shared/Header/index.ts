// import { $router } from '../lib/router.js';

import Component from '../../../core/Component';
import IconButton from '../IconButton';
import './styles.scss';

type HeaderType = 'main' | 'menu-white' | 'menu-off-white' | 'menu-invisible';
interface HeaderProps {
  headerType: HeaderType;
  title?: string;
}

export default class Header extends Component {
  template() {
    const { headerType, title }: HeaderProps = this.$props;

    switch (headerType) {
      case 'main':
        return `
        <div class="header main">
            <div class="header__left-icon" id="category"></div>
            <div class="location">
              <div id="loc" style="width: 1.6rem; height: 1.6rem; overflow: hidden; margin-right: 0.4rem;"></div>
              <div class="header__title">${title}</div>
            </div>
            <div class="header__right-icon" style="display: flex;">
                <div id="user" style="margin-right: 1.6rem"></div>
                <div id="menu"></div>
            </div>
        </div>`;

      case 'menu-white':
        return `
        <div class="header menu-white">
            <div class="header__left-icon" id="left"></div>
            <div class="header__title">${title}</div>
            <div class="header__right-icon" id="right"></div>
        </div>`;

      case 'menu-off-white':
        return `
        <div class="header menu-off-white">
            <div class="header__left-icon" id="left"></div>
            <div class="header__title">${title}</div>
        </div>`;

      case 'menu-invisible':
        return `
        <div class="header menu-invisible">
            <div class="header__left-icon" id="left"></div>
            <div class="header__right-icon" id="right"></div>
        </div>`;

      default:
        return '';
    }
  }

  mounted() {
    const { headerType }: HeaderProps = this.$props;

    switch (headerType) {
      case 'main':
        const $category = this.$target.querySelector('#category');
        new IconButton($category as Element, {
          path: '../../../assets/category.svg',
        });
        const $user = this.$target.querySelector('#user');
        new IconButton($user as Element, {
          path: '../../../assets/user.svg',
        });
        const $menu = this.$target.querySelector('#menu');
        new IconButton($menu as Element, {
          path: '../../../assets/menu.svg',
        });
        const $loc = this.$target.querySelector('#loc');
        new IconButton($loc as Element, {
          path: '../../../assets/pinmap.svg',
        });
        break;

      case 'menu-white':
        break;

      case 'menu-off-white':
        const $left = this.$target.querySelector('#left');
        new IconButton($left as Element, {
          path: '../../../assets/left.svg',
        });
        break;

      case 'menu-invisible':
        const $leftWhite = this.$target.querySelector('#left');
        const $rightWhite = this.$target.querySelector('#right');

        new IconButton($leftWhite as Element, {
          path: '../../../assets/left-white.svg',
        });

        new IconButton($rightWhite as Element, {
          path: '../../../assets/more-white.svg',
        });

        break;

      default:
        break;
    }
  }
}
