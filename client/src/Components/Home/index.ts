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
import Auth from './../Auth/index';
import Dropdown from './../Shared/Dropdown/index';

export default class Home extends Component {
  setup() {
    this.$state = {
      items: [],
      locationId: '',
    };
    fetch('/api/me/locations', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ locationId: result[0].id });
      })
      .then(() => {
        fetch(`/api/posts/location/${this.$state.locationId}/category/0`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then(({ result }) => {
            this.setState({ items: result });
          });
      });
  }
  template() {
    return `
    <header></header>
    <div class="item-list"></div>
    <div id="menu-modal" class="modal-close"></div>
    <div id="category-modal" class="modal-close"></div>
    <div class="post-new-btn"></div> 
    <div id="user-modal" class="modal-close"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '역삼동',
      headerType: 'main',
    });

    const $itemList = this.$target.querySelector('.item-list');
    this.$state.items.forEach((item: CategoryListItemProps) => {
      const $item = document.createElement('div');
      $itemList?.append($item);
      new CategoryListItem($item as Element, item);
    });

    // post new btn
    const $postNewBtn = this.$target.querySelector('.post-new-btn');
    new Button($postNewBtn as Element, {
      buttonType: 'fab',
      handleClick: () => {
        $router.push('/post/new');
      },
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

    const $userModal =
      this.$target.querySelector('#user-modal') ||
      document.createElement('div');
    new Auth($userModal as Element);

    // buttons
    const $categoryBtn = this.$target.querySelector('#category');
    $categoryBtn?.addEventListener('click', () => {
      $categoryModal.className = 'modal-open';
    });

    const $menuBtn = this.$target.querySelector('#menu');
    $menuBtn?.addEventListener('click', () => {
      $menuModal.className = 'modal-open';
    });

    const $userBtn = this.$target.querySelector('#user');
    $userBtn?.addEventListener('click', () => {
      $userModal.className = 'modal-open';
    });

    const $locationBtn = this.$target.querySelector('.location');
    new Dropdown($locationBtn as HTMLElement, {
      lists: [
        {
          text: '역삼동',
          isWarning: false,
          // onclick: () => console.log('역삼동 설정 완료!!'),
        },
        {
          text: '내 동네 설정하기',
          isWarning: false,
          onclick: () => $router.push('/location'),
        },
      ],
      offset: 'center',
    });

    const $backBtns = this.$target.querySelectorAll('#left');
    $backBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.parentNode?.parentNode?.parentNode as Element;
        modal.className = 'modal-close';
      });
    });
  }
}
