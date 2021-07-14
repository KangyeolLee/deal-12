import Header from '../Shared/Header';
import Component from '../../core/Component';
import './styles.scss';
import ImgButton from '../Shared/ImgButton';

const imgs = [0, 0, 0, 0, 0, 0];

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
    <div class="new-post-wrapper">
        <div class="img-list"></div>
        <div style="padding: 0 1.6rem; box-sizing: border-box;">
            <div class="line"></div>
        </div>
    </div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '글쓰기',
      headerType: 'menu-white',
      extraIconName: 'check',
    });

    const $imgList = this.$target.querySelector('.img-list');
    new ImgButton($imgList as Element, {
      btnType: 'add',
      imgNum: imgs.length,
    });

    imgs.forEach(() => {
      const $img = document.createElement('div');
      $img.className = 'img-del';
      new ImgButton($img as Element, {
        btnType: 'delete',
      });
      $imgList?.append($img);
    });
  }
}
