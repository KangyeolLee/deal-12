import Header from '../Shared/Header';
import Component from '../../core/Component';
import './styles.scss';
import ImgButton from '../Shared/ImgButton';
import IconButton from '../Shared/IconButton';

const imgs = [0, 0, 0, 0, 0, 0];

export default class Home extends Component {
  setup() {
    this.$state = {
      title: null,
      price: null,
      content: null,
    };
  }

  template() {
    const line = `
    <div style="padding: 0 1.6rem; box-sizing: border-box;">
        <div class="line"></div>
    </div>`;

    return `
    <header></header>
    <div class="new-post-wrapper">
        <div class="img-list"></div>
        ${line}
        <div class="post-container">
            <input id="title" placeholder="글 제목" />
            ${line}
            <input id="price" placeholder="₩ 가격(선택사항)"/>
            ${line}
            <textarea id="content" rows=8 placeholder="게시글 내용을 작성해주세요."></textarea>
        </div>
    </div>

    <div class="loc-footer">
        <div id="loc" style="width: 1.6rem; height: 1.6rem; overflow: hidden; margin-right: 0.4rem;"></div>
        <div>역삼동</div>
    </div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '글쓰기',
      headerType: 'menu-white',
      extraIconName: 'check-disable',
    });

    const $loc = this.$target.querySelector('#loc');
    new IconButton($loc as Element, {
      name: 'pinmap',
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

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      history.back();
    });
  }

  setEvent() {
    this.$target.addEventListener('input', (e) => {
      //   if (e.target.id === 'title') {
      //     this.setState({ title: e.target.value });
      //   } else if (e.target.id === 'price') {
      //     this.setState({ price: e.target.value });
      //   } else {
      //     this.setState({ content: e.target.value });
      //   }
      const $title = (this.$target.querySelector('#title') as HTMLInputElement)
        .value;
      const $content = (
        this.$target.querySelector('#content') as HTMLInputElement
      ).value;

      const $checkIcon = this.$target.querySelector('.header__right-icon');
      if ($title && $content) {
        new IconButton($checkIcon as Element, {
          name: 'check-active',
        });
      } else {
        new IconButton($checkIcon as Element, {
          name: 'check-disable',
        });
      }
    });
  }
}
