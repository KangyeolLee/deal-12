import './styles';
import Component from '../../core/Component';
import ChatListItem from '../Shared/ChatListItem';
import Header from '../Shared/Header';
import { token } from '../../lib/util';
import { socket } from '../../main';
import dayjs from 'dayjs';

export default class Chatlist extends Component {
  setup() {
    this.$state = {
      chats: [],
      myId: -1,
    };
    const postId = location.href.split('post/')[1];

    fetch('/api/me/', {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        this.setState({
          myId: user.id,
        });
      });

    fetch(`/api/chat/post/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ chats: result });
      })
      .then(() => {
        // 새로운 채팅방 생성 감지
        socket.on(
          `user-${this.$state.myId}`,
          (fromId: number, chatroomId: number, message: string, post: any) => {
            const isExist = this.$state.chats.find(
              (chat: any) => chat.id === Number(chatroomId)
            );

            if (!isExist) {
              const $chatList = this.$target.querySelector('.chat-lists');
              const $list = document.createElement('div');
              $chatList?.append($list);
              const newChatroom = {
                id: Number(chatroomId),
                buyer_id: fromId,
                seller_id: this.$state.myId,
                my_id: this.$state.myId,
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
      });
  }

  template() {
    return `
      <header></header>
      <div class="chat-lists"></div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $chatList = this.$target.querySelector('.chat-lists');

    new Header($header as HTMLElement, {
      headerType: 'menu-off-white',
      title: '채팅하기',
    });

    if (this.$state.chats.length > 0) {
      this.$state.chats.forEach((chat: any) => {
        const $list = document.createElement('div');
        $chatList?.append($list);
        new ChatListItem($list as Element, chat);
      });
    } else {
      ($chatList as HTMLDivElement).innerHTML =
        '해당 글에 대한 채팅목록 이 없습니다.';
      ($chatList as HTMLDivElement).className = 'no-data';
    }

    const $backBtn = $header?.querySelector('#left');
    const postId = location.href.split('post/')[1];
    $backBtn?.addEventListener('click', () => history.back());
  }
}
