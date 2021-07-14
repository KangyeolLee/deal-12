import { $router } from '../../lib/router';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import Button from '../Shared/Button';
import './styles.scss';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import ChatListItem from '../Shared/ChatListItem';
import Chatlist from 'Components/ChatList';

const tapList = [
  { id: 'sell-list', title: '판매목록' },
  { id: 'chat-list', title: '채팅' },
  { id: 'like-list', title: '관심목록' },
];

const noData = [
  '등록한 상품이 없습니다.',
  '채팅 기록이 없습니다.',
  '관심을 표시한 상품이 없습니다.',
];

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
export default class Menu extends Component {
  setup() {
    this.$state = { menu: 'sell-list' };
  }

  template() {
    return `
    <header></header>
    <div id="tap-bar"></div>
    <div class="menu-wrapper"></div>
    `;
  }
  mounted() {
    const { menu } = this.$state;

    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '메뉴',
      headerType: 'menu-off-white',
    });

    const $tapBar = this.$target.querySelector('#tap-bar');
    tapList.forEach((tap) => {
      const btn = document.createElement('div');
      btn.id = tap.id;
      new Button(btn as Element, {
        buttonType: 'tap',
        title: tap.title,
        isClicked: this.$state.menu === btn.id,
        handleClick: () => {
          if (menu !== tap.id) this.setState({ menu: tap.id });
        },
      });
      $tapBar?.append(btn);
    });

    const $wrapper =
      this.$target.querySelector('.menu-wrapper') ||
      document.createElement('div');
    switch (menu) {
      case 'sell-list':
        if (list.length > 0) {
          list.forEach((item) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new CategoryListItem($item as Element, item);
          });
        } else {
          $wrapper.innerHTML = noData[0];
          $wrapper.className = 'no-data';
        }
        break;

      case 'chat-list':
        // new Chatlist($wrapper as Element);
        $wrapper.innerHTML = noData[1];
        $wrapper.className = 'no-data';
        break;

      case 'like-list':
        if (list.length > 0) {
          list.forEach((item) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new CategoryListItem($item as Element, item);
          });
        } else {
          $wrapper.innerHTML = noData[0];
          $wrapper.className = 'no-data';
        }
        break;

      default:
        break;
    }

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      console.log('asdf');
      this.$target.className = 'modal-close';
    });
  }
}
