import './styles';
import Component from '../../../core/Component';

export default class ChatBubble extends Component {
  template() {
    const { myId, fromId, message } = this.$props;

    return `
      <div class="chat-bubbles__message ${
        fromId === myId ? 'by-me' : 'by-partner'
      }">
        <p class="content">${message}</p>
      </div>
    `;
  }
}
