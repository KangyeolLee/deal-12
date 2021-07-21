import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import InfoProduct from '../Shared/InfoProduct';
import ChatBubble from '../Shared/ChatBubble';
import ChatBar from '../Shared/ChatBar/index';
import { $router } from '../../lib/router';
import InputPopup from '../Shared/InputPopup';
import { socket } from '../../main';
import { token } from '../../lib/util';

interface ChatBubbleType {
  userId: string;
  message: string;
  checked: boolean;
  roomId: number;
}

// UI 확인용 임시 더미데이터

export default class ChatDetail extends Component {
  setup() {
    this.$state = {
      me: {},
    };
    fetch('/api/me', {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        this.setState({ me: user });
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

    new InfoProduct($productInfo as HTMLLIElement, this.$state);

    new InputPopup($modal as HTMLElement, {
      message: '정말로 이 채팅방을 나가시겠습니까?',
      btnText: '나기기',
      inputType: 'alert',
    });

    const $chatBubbles = this.$target.querySelector('.chat-bubbles');
    socket.on('server', (id, message) => {
      console.log(id, message); // x8WIv7-mJelg7on_ALbx
      const $chatItem = document.createElement('div');
      $chatBubbles?.append($chatItem);
      new ChatBubble($chatItem as HTMLElement, {
        myId: this.$state.me.id,
        fromId: id,
        message,
      });
      (this.$target.querySelector('input') as HTMLInputElement).value = '';
    });

    // dummyChatBubblesData.forEach((chat: ChatBubbleType) => {
    //   const $chatItem = document.createElement('div');
    //   $chatBubbles?.append($chatItem);
    //   new ChatBubble($chatItem as HTMLElement, chat);
    // });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => $router.push('/chat'));

    const $rightBtn = this.$target.querySelector('#right');
    $rightBtn?.addEventListener('click', () => {
      ($modal as HTMLElement).classList.add('modal-open');
    });
  }

  setEvent() {
    this.addEvent('click', '.send-button', () => {
      console.log('asdf');
      socket.emit(
        'client',
        this.$state.me.id,
        this.$target.querySelector('input')?.value
      );
    });
  }
}
