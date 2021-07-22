import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import InfoProduct from '../Shared/InfoProduct';
import ChatBubble from '../Shared/ChatBubble';
import ChatBar from '../Shared/ChatBar/index';
import InputPopup from '../Shared/InputPopup';
import { socket } from '../../main';
import { token } from '../../lib/util';
import { $router } from '../../lib/router';

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
      other: {},
      chatroomId: location.href.split('chatroom/')[1],
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
    fetch(`/api/chat/chatroom/${this.$state.chatroomId}`, {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ chats: result.data, post: result.post });

        // 다른 유저의 닉네임 가져오기
        const seller_id = this.$state.post.seller_id;
        const buyer_id = this.$state.post.buyer_id;
        const my_id = this.$state.me.id;
        fetch(`/api/user/${buyer_id === my_id ? seller_id : buyer_id}`)
          .then((r) => r.json())
          .then(({ user }) => {
            this.setState({ other: user });
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
      title: this.$state.other.nickname,
    });

    new ChatBar($chatbar as HTMLElement);

    new InfoProduct($productInfo as HTMLLIElement, this.$state.post);

    new InputPopup($modal as HTMLElement, {
      message: '정말로 이 채팅방을 나가시겠습니까?',
      btnText: '나기기',
      inputType: 'alert',
      onclick: () => {
        fetch(`/api/chat/chatroom/${this.$state.chatroomId}`, {
          method: 'DELETE',
          headers: {
            Authorization: token(),
          },
        }).then(() => $router.push('/home'));
      },
    });

    const $chatBubbles = this.$target.querySelector('.chat-bubbles') as Element;

    this.$state.chats.forEach((chat: ChatBubbleType) => {
      const $chatItem = document.createElement('div');
      $chatBubbles?.append($chatItem);
      new ChatBubble($chatItem as HTMLElement, {
        myId: this.$state.me.id,
        user_id: chat.user_id,
        text: chat.text,
      });
    });

    // 스크롤 하단으로
    (this.$target.querySelector('input') as HTMLInputElement).value = '';
    $chatBubbles.scrollTop = $chatBubbles?.scrollHeight as number;

    socket.on(`server-${this.$state.chatroomId}`, (id, message) => {
      const $chatItem = document.createElement('div');
      $chatBubbles?.append($chatItem);
      new ChatBubble($chatItem as HTMLElement, {
        myId: this.$state.me.id,
        user_id: id,
        text: message,
      });

      // 스크롤 하단으로
      (this.$target.querySelector('input') as HTMLInputElement).value = '';
      $chatBubbles.scrollTop = $chatBubbles?.scrollHeight as number;
    });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => history.back());

    const $rightBtn = this.$target.querySelector('#right');
    $rightBtn?.addEventListener('click', () => {
      ($modal as HTMLElement).classList.add('modal-open');
    });

    // 전송
    this.$target
      .querySelector('.send-button')
      ?.addEventListener('click', () => {
        socket.emit(
          'client',
          this.$state.me.id,
          this.$state.other.id,
          this.$target.querySelector('input')?.value,
          this.$state.chatroomId,
          this.$state.post
        );
      });
  }
}
