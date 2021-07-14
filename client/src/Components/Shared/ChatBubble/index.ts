import './styles';
import Component from '../../../core/Component';

export default class ChatBubble extends Component {
  setup() {
    this.$state = [
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
  }

  template() {
    const myId = 'userA';

    return `
      ${this.$state
        .map((chat) => {
          if (chat.userId !== myId) {
            return `
            <div class="chat-bubbles__message by-partner">
              <p class="content">${chat.message}</p>
            </div>
          `;
          }

          return `
          <div class="chat-bubbles__message by-me">
            <p class="content">${chat.message}</p>
          </div>
        `;
        })
        .join('')}
    `;
  }
}
