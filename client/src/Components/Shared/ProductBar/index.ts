import Component from '../../../core/Component';
import './styles';
import IconButton from './../IconButton';
import Button from '../Button/index';
import { $router } from '../../../lib/router';
import { token } from '../../../lib/util';

export default class ProductBar extends Component {
  setup() {
    this.$state = {};

    if (token()) {
      const headers = new Headers();
      headers.append('Authorization', token());

      fetch(`/api/posts/${this.$props.post_id}/interest/check`, {
        method: 'GET',
        headers,
      })
        .then((res) => res.json())
        .then(({ result }) => {
          if (result) this.setState({ isLiked: true });
        });
    }
  }

  template() {
    const { price } = this.$props;
    return `
      <div class="product-bar-details">
        <div class="image-wrapper"></div>
        <span class="product-price">${price}원</span>
      </div>
      <div class="button"></div>
    `;
  }

  mounted() {
    const { isLogin, isMine, post_id, seller_id } = this.$props;
    const { isLiked } = this.$state;
    const $imageWrapper = this.$target.querySelector('.image-wrapper');
    const $button = this.$target.querySelector('.button');

    new IconButton($imageWrapper as HTMLElement, {
      name: isLiked ? 'heart-fill' : 'heart',
      disabled: !isLogin,
    });

    new Button($button as HTMLElement, {
      buttonType: 'medium',
      title: isMine ? '채팅 목록 보기' : '문의하기',
      disabled: !isLogin,
      handleClick: async () => {
        if (isMine) {
          $router.push(`/chat/post/${post_id}`);
        } else {
          fetch('/api/chat/chatroom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token(),
            },
            body: JSON.stringify({
              seller_id,
              post_id,
            }),
          })
            .then((r) => r.json())
            .then(({ result }) => {
              $router.push(`/chatroom/${result.id}`);
            });
        }
      },
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '.icon-btn',
      ({ target }: { target: HTMLElement }) => {
        if (target.className === 'icon-btn') {
          const headers = new Headers();
          headers.append('Authorization', token());

          if (!this.$state.isLiked) {
            console.log('좋아요 요청');
            fetch(`/api/posts/${this.$props.post_id}/interest`, {
              method: 'POST',
              headers,
            }).then(() => this.setState({ isLiked: true }));
          } else {
            console.log('싫어요 요청');
            fetch(`/api/posts/${this.$props.post_id}/interest`, {
              method: 'DELETE',
              headers,
            }).then(() => this.setState({ isLiked: false }));
          }
        }
      }
    );
  }
}
