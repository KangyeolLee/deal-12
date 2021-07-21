import './styles';

import Component from '../../../core/Component';
import ImgBox from './../ImgBox/index';
import { $router } from '../../../lib/router';
import { getTimestamp } from '../../../lib/util';

interface ParamsType {
  buyer_id: number;
  seller_id: number;
  my_id: number;
  thumbnail: string;
  last_text: string;
  timestamp: string;
}

export default class ChatListItem extends Component {
  setup() {
    this.$state = {
      other: {},
    };
    const { buyer_id, seller_id, my_id }: ParamsType = this.$props;
    fetch(`/api/user/${buyer_id === my_id ? seller_id : buyer_id}`)
      .then((r) => r.json())
      .then(({ user }) => {
        this.setState({ other: user });
      });
  }
  template() {
    const { last_text, timestamp }: ParamsType = this.$props;

    return `
    <div class="chat-list__item ${'checked' ? 'checked' : ''}">
      <div class="user-section">
        <div class="user-section__detail">
          <h6 class="username">${this.$state.other.nickname}</h6>
          <p class="content">${last_text || ''}</p>
        </div>
        <span class="timestamp">${getTimestamp(timestamp)}</span>
      </div>
      <div class="image-wrapper"></div>
    </div>
    `;
  }

  mounted() {
    const { id } = this.$props;
    const $imageWrapper = this.$target.querySelector('.image-wrapper');
    const $list = this.$target.querySelector('.chat-list__item');

    new ImgBox($imageWrapper as HTMLElement, {
      imgType: 'small',
      img: this.$props.thumbnail,
    });

    $list?.addEventListener('click', () => $router.push(`/chatroom/${id}`));
  }
}
