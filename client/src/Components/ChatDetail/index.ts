import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import InfoProduct from '../Shared/InfoProduct';
import ChatBubble from '../Shared/ChatBubble';
import ChatBar from '../Shared/ChatBar/index';

export default class ChatDetail extends Component {
  setup() {
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
        <div class="product-info">
          ${InfoProduct(this.$state)}
        </div>
        <div class="chat-bubbles"></div>
        <div class="chatbar"></div>
      </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $chatBubbles = this.$target.querySelector('.chat-bubbles');
    const $chatbar = this.$target.querySelector('.chatbar');

    new Header($header as HTMLElement, {
      headerType: 'menu-white',
      title: 'UserE',
    });

    new ChatBubble($chatBubbles as HTMLElement);

    new ChatBar($chatbar as HTMLElement);
  }
}
