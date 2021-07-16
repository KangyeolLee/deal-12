import './styles';

import Component from '../../../core/Component';
import ImgBox from './../ImgBox/index';
import { $router } from '../../../lib/router';

interface ParamsType {
  username: string;
  timestamp: string;
  content: string;
  img: string;
  checked?: boolean;
}

export default class ChatListItem extends Component {
  template() {
    const { checked, username, content, timestamp, img }: ParamsType =
      this.$props;

    return `
    <div class="chat-list__item ${checked ? 'checked' : ''}">
      <div class="user-section">
        <div class="user-section__detail">
          <h6 class="username">${username}</h6>
          <p class="content">${content}</p>
        </div>
        <span class="timestamp">${timestamp}</span>
      </div>
      <div class="image-wrapper"></div>
    </div>
    `;
  }

  mounted() {
    const { img } = this.$props;
    const $imageWrapper = this.$target.querySelector('.image-wrapper');
    const $list = this.$target.querySelector('.chat-list__item');

    new ImgBox($imageWrapper as HTMLElement, {
      imgType: 'small',
      img,
    });

    $list?.addEventListener('click', () => $router.push('/chat/:id'));
  }
}
