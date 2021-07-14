import './styles';
import Component from '../../../core/Component';

export default class ChatBar extends Component {
  setup() {}

  template() {
    return `
      <form class="chat-form">
        <input type="text" placeholder="메세지를 입력하세요." />
        <button class="send-button">send</button>
      </form>
    `;
  }
}
