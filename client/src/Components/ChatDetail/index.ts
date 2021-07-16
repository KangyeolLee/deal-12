import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import InfoProduct from '../Shared/InfoProduct';
import ChatBubble from '../Shared/ChatBubble';
import ChatBar from '../Shared/ChatBar/index';
import { $router } from '../../lib/router';
import InputPopup from './../Shared/InputPopup/indext';

interface ChatBubbleType {
  userId: string;
  message: string;
  checked: boolean;
  roomId: number;
}

// UI 확인용 임시 더미데이터
const dummyChatBubblesData: ChatBubbleType[] = [
  {
    userId: 'userE',
    message: '안녕하세요! 궁금한게 있는데요',
    checked: true,
    roomId: 1,
  },
  { userId: 'userA', message: '네 안녕하세요!', checked: true, roomId: 1 },
  { userId: 'userE', message: '혹시', checked: true, roomId: 1 },
  {
    userId: 'userE',
    message: '실제로 신어볼 수 있는건가요??',
    checked: false,
    roomId: 1,
  },
];

export default class ChatDetail extends Component {
  setup() {
    // UI 확인용 임시 더미데이터
    this.$state = {
      title: '빈티지 롤러 스케이트',
      image:
        'https://user-images.githubusercontent.com/48883344/125383566-8c373e00-e3d2-11eb-82c3-565a0f5da5f6.png',
      price: '169,000원',
    };
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
    const $chatBubbles = this.$target.querySelector('.chat-bubbles');
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
      isAlert: true,
    });

    dummyChatBubblesData.forEach((chat: ChatBubbleType) => {
      const $chatItem = document.createElement('div');
      $chatBubbles?.append($chatItem);
      new ChatBubble($chatItem as HTMLElement, chat);
    });
  }

  setEvent() {
    const $modal = this.$target.querySelector('.chat-modal');
    this.addEvent('click', '#right', () => $modal?.classList.add('modal-open'));
    this.addEvent('click', '#left', () => $router.push('/chat'));
  }
}
