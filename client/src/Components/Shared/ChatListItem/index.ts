import './styles';

import Component from '../../../core/Component';

interface ParamsType {
  username: string;
  timestamp: string;
  content: string;
  img: string;
  checked?: boolean;
}

export default class ChatListItem extends Component {
  template() {
    const { checked, username, content, timestamp, img }: ParamsType = this.$props;

    return `
    <div class="chat-list__item ${checked ? 'checked' : ''}">
      <div class="user-section">
        <div class="user-section__detail">
          <h6 class="username">${username}</h6>
          <p class="content">${content}</p>
        </div>
        <span class="timestamp">${timestamp}</span>
      </div>
      <div class="image-wrapper">
        <img src="${img}" alt="상품 미리보기" />
      </div>
    </div>
    `;
  }
}
