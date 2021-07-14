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
    return `
      ${this.$props
        .map((chat: ParamsType) => {
          return `
            <div class="chat-list__item ${chat.checked ? 'checked' : ''}">
              <div class="user-section">
                <div class="user-section__detail">
                  <h6 class="username">${chat.username}</h6>
                  <p class="content">${chat.content}</p>
                </div>
                <span class="timestamp">${chat.timestamp}</span>
              </div>
              <div class="image-wrapper">
                <img src="${chat.img}" alt="상품 미리보기" />
              </div>
            </div>
        `;
        })
        .join('')}
    `;
  }
}
