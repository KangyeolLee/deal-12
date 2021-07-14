import { $router } from '../../lib/router';
import Category from '../Category';
import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';
import './styles.scss';
import Menu from '../Menu';
import Button from '../Shared/Button';

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
    <div id="item-list"></div>
    <div id="menu-modal" class="modal-close"></div>
    <div id="category-modal" class="modal-close"></div>
    <div class="post-new-btn"></div> 
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

    // modals
    const $categoryModal =
      this.$target.querySelector('#category-modal') ||
      document.createElement('div');
    new Category($categoryModal as Element);

    const $menuModal =
      this.$target.querySelector('#menu-modal') ||
      document.createElement('div');
    new Menu($menuModal as Element);

    // buttons
    const $categoryBtn = this.$target.querySelector('#category');
    $categoryBtn?.addEventListener('click', () => {
      $categoryModal.className = 'modal-open';
    });

    const $menuBtn = this.$target.querySelector('#menu');
    $menuBtn?.addEventListener('click', () => {
      $menuModal.className = 'modal-open';
    });

    // post new btn
    const $postNewBtn = this.$target.querySelector('.post-new-btn');
    new Button($postNewBtn as Element, {
      buttonType: 'fab',
      handleClick: () => {
        $router.push('/post/new');
      },
    });
  }
}
