import Component from '../../core/Component';
import Header from '../Shared/Header';
import Button from '../Shared/Button';
import './styles.scss';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import ChatListItem from '../Shared/ChatListItem';
import { token } from '../../lib/util';
import { socket } from '../../main';
import dayjs from 'dayjs';
import { setLoading } from './../../lib/util';

const tapList = [
  { id: 'sell-list', title: '판매목록' },
  { id: 'chat-list', title: '채팅' },
  { id: 'like-list', title: '관심목록' },
];

export default class Menu extends Component {
  setup() {
    this.$state = {
      menu: 'sell-list',
      sells: [],
      chats: [],
      interests: [],
    };

    const headers = new Headers();
    headers.append('Authorization', token());

    let urls = [
      '/api/me/',
      '/api/me/posts',
      '/api/me/chatrooms',
      '/api/me/like/posts',
    ];
    let requests = urls.map((url) =>
      fetch(url, {
        method: 'GET',
        headers,
      })
    );

    setLoading(true);

    Promise.all(requests)
      .then((responses) => responses)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((datas) => {
        const states = {};
        datas.forEach((data) => {
          Object.assign(states, data);
        });
        return states;
      })
      .then((states) => this.setState({ ...states }))
      .finally(() => setLoading(false));
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
    const isLogin = token();

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
            new CategoryListItem($item as Element, {
              ...item,
              isLogin,
              myId: this.$state.user.id,
            });
          });
        } else {
          setTimeout(() => ($wrapper.className = 'no-data'), 500);
        }
        break;

      case 'chat-list':
        // 새로운 채팅방 생성 감지
        socket.on(
          `user-${this.$state.user.id}`,
          (fromId: number, chatroomId: number, message: string, post: any) => {
            const isExist = this.$state.chats.find(
              (chat: any) => chat.id === Number(chatroomId)
            );

            if (!isExist) {
              const $chatList = this.$target.querySelector('.chat-lists');
              const $list = document.createElement('div');
              $chatList?.append($list);
              const newChatroom = {
                id: chatroomId,
                buyer_id: fromId,
                seller_id: this.$state.user.id,
                my_id: this.$state.user.id,
                thumbnail: post.thumbnail,
                last_text: message,
                unread_count: 1,
                timestamp: dayjs(new Date()),
              };
              new ChatListItem($list as Element, newChatroom);

              this.setState({
                chats: [...this.$state.chats, newChatroom],
              });
            }
          }
        );

        if (this.$state.chats.length > 0) {
          this.$state.chats.forEach((item: any) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new ChatListItem($item as Element, item);
          });
        } else {
          $wrapper.className = 'no-data';
        }
        break;

      case 'like-list':
        if (this.$state.interests.length > 0) {
          this.$state.interests.forEach((item: CategoryListItemProps) => {
            const $item = document.createElement('div');
            $wrapper?.append($item);
            new CategoryListItem($item as Element, {
              ...item,
              isLogin,
            });
          });
        } else {
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
