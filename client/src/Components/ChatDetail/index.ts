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
      title: '우아한 옷 팔아요',
      image:
        'https://flexible.img.hani.co.kr/flexible/normal/700/1040/imgdb/original/2021/0428/20210428504000.jpg',
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

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => $router.push('/chat'));

    const $rightBtn = this.$target.querySelector('#right');
    $rightBtn?.addEventListener('click', () => {
      ($modal as HTMLElement).classList.add('modal-open');
    });
  }
}
