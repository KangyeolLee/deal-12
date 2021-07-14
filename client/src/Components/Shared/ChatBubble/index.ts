import './styles';
import Component from '../../../core/Component';

export default class ChatBubble extends Component {
  template() {
    const myId = 'userA';
    const { userId, message } = this.$props;

    return `
      <div class="chat-bubbles__message ${
        userId === myId ? 'by-me' : 'by-partner'
      }">
        <p class="content">${message}</p>
      </div>
    `;
  }
}
