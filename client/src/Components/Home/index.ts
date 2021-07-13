// import { $router } from '../lib/router.js';

import Category from '../Category';
import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../shared/CategoryListItem';
import Header from '../shared/Header';
import './styles.scss';

const list: CategoryListItemProps[] = [];
[0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(() => {
  list.push({
    title: 'Title',
    img: 'asdf',
    price: 12345,
    location: '역삼동',
    timestamp: '3시간 전',
    isLiked: true,
    commentNum: 1,
    likeNum: 1,
  });
});

export default class Home extends Component {
  setup() {
    this.$state = {
      isMenuOpened: false,
      isCategoryOpened: false,
      isUserOpened: false,
    };
  }
  template() {
    return `
    <header></header>
    <div id="item-list"></div>
    <div id="menu-modal"></div>
    <div id="category-modal"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '역삼동',
      headerType: 'main',
    });

    const $itemList = this.$target.querySelector('#item-list');
    list.forEach((item) => {
      const $item = document.createElement('div');
      $itemList?.append($item);
      new CategoryListItem($item as Element, item);
    });

    const $categoryBtn = this.$target.querySelector('#category');
    $categoryBtn?.addEventListener('click', () => {
      const $categoryModal =
        this.$target.querySelector('#category-modal') ||
        document.createElement('div');
      $categoryModal.className = 'modal';
      new Category($categoryModal as Element);
    });

    // const $menuBtn = this.$target.querySelector('#menu');
    // $menuBtn?.addEventListener('click', () => {
    //   // this.setState({ isMenuOpened: true });
    //   const $menuModal =
    //     this.$target.querySelector('#menu-modal') ||
    //     document.createElement('div');
    //   $menuModal.className = 'menu-modal';
    //   new Category($menuModal as Element);
    //   // new Category($menu as Element);
    // });
  }
}
