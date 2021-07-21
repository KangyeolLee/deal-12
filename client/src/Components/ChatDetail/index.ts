import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import InfoProduct from '../Shared/InfoProduct';
import ChatBubble from '../Shared/ChatBubble';
import ChatBar from '../Shared/ChatBar/index';
import InputPopup from '../Shared/InputPopup';
import { socket } from '../../main';
import { token } from '../../lib/util';

interface ChatBubbleType {
  myId: number;
  user_id: number;
  text: string;
}

export default class ChatDetail extends Component {
  setup() {
    this.$state = {
      chats: [],
      me: {},
      post: {},
    };

    // 내 정보
    fetch(`/api/me/`, {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        this.setState({ me: user });
      });

    // 채팅내역
    const chatroomId = location.href.split('chatroom/')[1];
    fetch(`/api/chat/chatroom/${chatroomId}`, {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result);
        this.setState({ chats: result.data, post: result.post });

        const $chatBubbles = this.$target.querySelector('.chat-bubbles');

        this.$state.chats.forEach((chat: ChatBubbleType) => {
          const $chatItem = document.createElement('div');
          $chatBubbles?.append($chatItem);
          new ChatBubble($chatItem as HTMLElement, {
            myId: this.$state.me.id,
            user_id: chat.user_id,
            text: chat.text,
          });
        });
      });
  }

  template() {
    return `
      <div class="chat-root">
        <header></header>
        <div class="product-info"></div>
        <div class="chat-bubbles"></div>
        <div class="chatbar"></div>
        <div class="chat-modal"></div>
      </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $chatbar = this.$target.querySelector('.chatbar');
    const $productInfo = this.$target.querySelector('.product-info');
    const $modal = this.$target.querySelector('.chat-modal');
    new Header($header as HTMLElement, {
      headerType: 'menu-white',
      extraIconName: 'logout',
      title: 'UserE',
    });

    new ChatBar($chatbar as HTMLElement);

    new InfoProduct($productInfo as HTMLLIElement, this.$state.post);

    new InputPopup($modal as HTMLElement, {
      message: '정말로 이 채팅방을 나가시겠습니까?',
      btnText: '나기기',
      inputType: 'alert',
    });

    const $chatBubbles = this.$target.querySelector('.chat-bubbles');
    const chatroomId = location.href.split('chatroom/')[1];
    socket.on(`server-${chatroomId}`, (id, message) => {
      const $chatItem = document.createElement('div');
      $chatBubbles?.append($chatItem);
      new ChatBubble($chatItem as HTMLElement, {
        myId: this.$state.me.id,
        user_id: id,
        text: message,
      });
      (this.$target.querySelector('input') as HTMLInputElement).value = '';
    });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => history.back());

    const $rightBtn = this.$target.querySelector('#right');
    $rightBtn?.addEventListener('click', () => {
      ($modal as HTMLElement).classList.add('modal-open');
    });
  }

  setEvent() {
    const chatroomId = location.href.split('chatroom/')[1];
    this.addEvent('click', '.send-button', () => {
      socket.emit(
        'client',
        this.$state.me.id,
        this.$target.querySelector('input')?.value,
        chatroomId
      );
    });
  }
}
