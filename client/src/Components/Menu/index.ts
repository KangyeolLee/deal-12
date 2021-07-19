import Component from '../../core/Component';
import Header from '../Shared/Header';
import Button from '../Shared/Button';
import './styles.scss';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import ChatListItem from '../Shared/ChatListItem';
import { token } from '../../lib/util';

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

const chatList = [
  {
    username: 'UserE',
    timestamp: '1분 전',
    content: '실제로 신어볼 수 있는 건가요?',
    img: 'https://flexible.img.hani.co.kr/flexible/normal/700/1040/imgdb/original/2021/0428/20210428504000.jpg',
    checked: true,
  },
  {
    username: 'UserD',
    timestamp: '1시간 전',
    content: '감사합니다 :)',
    img: 'https://flexible.img.hani.co.kr/flexible/normal/700/1040/imgdb/original/2021/0428/20210428504000.jpg',
    checked: false,
  },
];
export default class Menu extends Component {
  setup() {
    this.$state = { menu: 'sell-list', sells: [], interests: [] };

    var headers = new Headers();
    headers.append('Authorization', token());

    // 판매목록
    fetch('/api/me/posts', {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ sells: result });
      });

    // 관심목록
    fetch('/api/me/like/posts', {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ interests: result });
      });
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
        if (this.$state.sells.length > 0) {
          this.$state.sells.forEach((item: CategoryListItemProps) => {
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
        if (chatList.length > 0) {
          chatList.forEach((item) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new ChatListItem($item as Element, item);
          });
        } else {
          $wrapper.innerHTML = noData[1];
          $wrapper.className = 'no-data';
        }
        break;

      case 'like-list':
        if (this.$state.interests.length > 0) {
          this.$state.interests.forEach((item: CategoryListItemProps) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new CategoryListItem($item as Element, item);
          });
        } else {
          $wrapper.innerHTML = noData[2];
          $wrapper.className = 'no-data';
        }
        break;

      default:
        break;
    }
  }
  setEvent() {
    this.addEvent('click', '#left', () => {
      this.$target.className = 'modal-close';
    });
  }
}
