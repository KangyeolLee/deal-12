import './styles';
import Component from '../../../core/Component';
import IconButton from '../IconButton/index';
import TextInput from '../TextInput/index';

export default class ChatBar extends Component {
  setup() {}

  template() {
    return `
      <form class="chat-form">
        <div class="input-wrapper"></div>
        <div class="send-button">send</div>
      </form>
    `;
  }

  mounted() {
    const $wrapper = this.$target.querySelector('.input-wrapper');
    const $sendBtn = this.$target.querySelector('.send-button');

    new TextInput($wrapper as HTMLElement, {
      type: 'text',
      size: 'medium',
      placeholder: '메시지를 입력하세요.',
    });

    new IconButton($sendBtn as HTMLElement, {
      name: 'end-off',
    });
  }

  setEvent() {
    this.addEvent('keydown', 'input', (e: KeyboardEvent) => {
      const $sendBtn = this.$target.querySelector('.send-button');
      const $input = this.$target.querySelector('input');
      const name = $input?.value ? 'end-on' : 'end-off';
      const enter = e.key === 'Enter';

      new IconButton($sendBtn as HTMLElement, {
        name: enter ? 'end-off' : name,
      });
    });
  }
}
