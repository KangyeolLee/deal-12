import './styles';
import Component from '../../../core/Component';

export default class ChatBubble extends Component {
  template() {
    const { myId, user_id, text } = this.$props;

    return `
      <div class="chat-bubbles__message ${
        user_id === myId ? 'by-me' : 'by-partner'
      }">
        <p class="content">${text}</p>
      </div>
    `;
  }
}
