import {
  category,
  left,
  leftWhite,
  menu,
  morewhite,
  pinmapwhite,
  user,
} from '../../../../assets';
import Component from '../../../core/Component';
import IconButton from '../IconButton';
import './styles.scss';

type HeaderType = 'main' | 'menu-white' | 'menu-off-white' | 'menu-invisible';
interface HeaderProps {
  headerType: HeaderType;
  title?: string;
  extraImg?: string;
  isLogin?: string;
  isMine?: boolean;
}

export default class Header extends Component {
  template() {
    const { headerType, title, isLogin }: HeaderProps = this.$props;

    switch (headerType) {
      case 'main':
        return `
        <div class="header main">
            <div class="header__left-icon ${
              !isLogin && headerType !== 'main' ? 'not-clickable' : ''
            }" id="category"></div>
            <div class="location ${!isLogin ? 'not-clickable' : ''}">
              <div id="loc" style="width: 1.6rem; height: 1.6rem; overflow: hidden; margin-right: 0.4rem;"></div>
              <div>${title}</div>
            </div>
            <div class="header__right-icon" style="display: flex;">
                <div id="user"></div>
                ${
                  isLogin
                    ? '<div id="menu"  style="margin-left: 1.6rem"></div>'
                    : ''
                }
            </div>
        </div>`;

      case 'menu-white':
        return `
        <div class="header menu-white">
            <div class="header__left-icon" id="left"></div>
            <div>${title}</div>
            <div class="header__right-icon" id="right"></div>
        </div>`;

      case 'menu-off-white':
        return `
        <div class="header menu-off-white">
            <div class="header__left-icon" id="left"></div>
            <div>${title}</div>
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
    const { headerType, extraImg, isMine }: HeaderProps = this.$props;

    switch (headerType) {
      case 'main':
        const $category = this.$target.querySelector('#category');
        new IconButton($category as Element, {
          img: category,
        });
        const $user = this.$target.querySelector('#user');
        new IconButton($user as Element, {
          img: user,
        });
        const $menu = this.$target.querySelector('#menu');
        if ($menu) {
          new IconButton($menu as Element, {
            img: menu,
          });
        }
        const $loc = this.$target.querySelector('#loc');
        new IconButton($loc as Element, {
          img: pinmapwhite,
        });
        break;

      case 'menu-white':
        new IconButton(this.$target.querySelector('#left') as Element, {
          img: left,
        });
        new IconButton(this.$target.querySelector('#right') as Element, {
          img: extraImg,
        });
        break;

      case 'menu-off-white':
        const $left = this.$target.querySelector('#left');
        new IconButton($left as Element, {
          img: left,
        });
        break;

      case 'menu-invisible':
        new IconButton(this.$target.querySelector('#left') as Element, {
          img: leftWhite,
        });

        new IconButton(this.$target.querySelector('#right') as Element, {
          img: morewhite,
          hidden: !isMine,
        });

        break;

      default:
        break;
    }
  }
}
