import Component from '../../../core/Component';
import './styles';
import IconButton from './../IconButton';
import Button from '../Button/index';
import { $router } from '../../../lib/router';

export default class ProductBar extends Component {
  setup() {
    this.$state = {
      isLiked: false, // getLikes 해서 현재 postId와 비교
    };
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
    const { isLogin, isMine } = this.$props;
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
      handleClick: () => $router.push(`/chat/1`),
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '.icon-btn',
      ({ target }: { target: HTMLElement }) => {
        if (target.className === 'icon-btn') {
          this.setState({ isLiked: !this.$state.isLiked });
        }
      }
    );
  }
}
