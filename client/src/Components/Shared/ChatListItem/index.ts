import './styles';

import Component from '../../../core/Component';
import ImgBox from './../ImgBox/index';
import { $router } from '../../../lib/router';
import { getTimestamp } from '../../../lib/util';
import { socket } from '../../../main';
import dayjs from 'dayjs';

interface ParamsType {
  buyer_id: number;
  seller_id: number;
  my_id: number;
  thumbnail: string;
  last_text: string;
  timestamp: string;
  unread_count: number;
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

    socket.on(`server-${this.$props.id}`, (fromId: number, message: string) => {
      (
        this.$target.querySelector('.content') as HTMLParagraphElement
      ).innerText = message;

      (
        this.$target.querySelector('.timestamp') as HTMLParagraphElement
      ).innerText = getTimestamp(
        dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      );

      if (fromId !== this.$props.my_id) {
        const $unread = this.$target.querySelector(
          '.unread'
        ) as HTMLParagraphElement;
        $unread.innerText = (Number($unread.innerText) + 1).toString();
        (
          this.$target.querySelector('.chat-list__item') as HTMLDivElement
        ).style.backgroundColor = '#fff';
        $unread.style.backgroundColor = '#219a95';
      }
    });
  }
  template() {
    const { last_text, timestamp, unread_count }: ParamsType = this.$props;

    return `
    <div class="chat-list__item ${unread_count > 0 ? 'checked' : ''}">
      <div class="user-section">
        <div class="user-section__detail">
          <h6 class="username">${this.$state.other.nickname}</h6>
          <p class="content">${last_text || ''}</p>
        </div>
        <div class="numbers">
          <span class="timestamp">${getTimestamp(timestamp)}</span>
          <span class="unread" style="background: ${
            unread_count > 0 ? '#219a95' : '#f6f6f6'
          }">${unread_count}</span>
        </div>
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
