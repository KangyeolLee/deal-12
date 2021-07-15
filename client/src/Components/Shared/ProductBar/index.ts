import Component from '../../../core/Component';
import './styles';
import IconButton from './../IconButton';
import Button from '../Button/index';
import { $router } from '../../../lib/router';

export default class ProductBar extends Component {
  template() {
    const { price } = this.$props;

    return `
      <div class="product-bar-details">
        <div class="image-wrapper"></div>
        <span class="product-price">${price}</span>
      </div>
      <div class="button"></div>
    `;
  }

  mounted() {
    const $imageWrapper = this.$target.querySelector('.image-wrapper');
    const $button = this.$target.querySelector('.button');

    new IconButton($imageWrapper as HTMLElement, {
      name: 'heart',
    });

    new Button($button as HTMLElement, {
      buttonType: 'medium',
      title: '채팅 목록 보기',
      handleClick: () => $router.push('/chat'),
    });
  }
}
