import Header from '../Shared/Header';
import Component from '../../core/Component';
import './styles.scss';
import ImgButton from '../Shared/ImgButton';
import IconButton from '../Shared/IconButton';
import Button from '../Shared/Button';

export default class NewPost extends Component {
  setup() {
    this.$state = {
      title: null,
      price: null,
      content: null,
      files: [],
      imgs: [],
      category: '',
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
            <div class="categories-wrapper"></div>
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

    // 사진 선택
    const selectImg = (e: any) => {
      const reader = new FileReader();
      const targetFile = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          files: [...this.$state.files, targetFile],
          imgs: [...this.$state.imgs, reader.result],
        });
      };

      reader.readAsDataURL(targetFile);
    };

    const $imgList = this.$target.querySelector('.img-list');
    new ImgButton($imgList as Element, {
      btnType: 'add',
      imgNum: this.$state.imgs.length,
      addImg: selectImg,
    });

    this.$state.imgs.forEach((url: string, idx: number) => {
      const $img = document.createElement('div');
      $img.id = `img-del-${idx}`;
      $img.className = 'img-del';
      new ImgButton($img as Element, {
        btnType: 'delete',
        img: url,
      });
      $imgList?.append($img);
    });

    const $categoriesWrapper = this.$target.querySelector(
      '.categories-wrapper'
    );
    new Categories($categoriesWrapper as Element);

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => history.back());
  }

  setEvent() {
    this.$target.addEventListener('input', () => {
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

      // check icon
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

    this.addEvent('click', '.del-btn', ({ target }: { target: Element }) => {
      const idx = (
        target.parentNode?.parentNode?.parentNode as Element
      ).id.split('img-del-')[1];

      this.setState({
        files: this.$state.files.filter(
          (_: File, i: number) => Number(idx) !== i
        ),
        imgs: this.$state.imgs.filter(
          (_: string, i: number) => Number(idx) !== i
        ),
      });
    });
  }
}

class Categories extends Component {
  setup() {
    this.$state = { categories: [] };
    fetch('/api/main/categories', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ categories: result });
      });
  }
  template() {
    return `
    <div class="categories">
        <div style="padding-left: 1.8rem;">(필수)카테고리를 선택해주세요.</div>
        <div class="categories__buttons"></div>
    </div>
    `;
  }
  mounted() {
    const $buttons = this.$target.querySelector('.categories__buttons');
    this.$state.categories.forEach((category: any) => {
      const $btn = document.createElement('div');
      $btn.id = `category-${category.id}`;
      $btn.className = 'btn';
      new Category($btn as Element, {
        title: category.name,
      });
      $buttons?.append($btn);
    });
  }
}

class Category extends Component {
  template() {
    return '<div></div>';
  }
  mounted() {
    const { title } = this.$props;
    const $btn = this.$target.querySelector('div');
    new Button($btn as Element, {
      buttonType: 'category',
      title: title,
      isClicked: this.$target.id === 'category-1',
      handleClick: () => {
        const categories = this.$target.parentNode?.querySelectorAll(
          '.btn'
        ) as NodeListOf<Element>;
        categories.forEach((btn) => {
          if (btn.id === this.$target.id) {
            (
              this.$target.querySelector('button') as HTMLButtonElement
            ).className = 'category active';
          } else {
            (
              this.$target.parentNode
                ?.querySelector(`#${btn.id}`)
                ?.querySelector('button') as HTMLButtonElement
            ).className = 'category';
          }
        });
      },
    });
  }
}
