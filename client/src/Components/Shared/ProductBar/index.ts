import Component from '../../../core/Component';
import './styles';
import IconButton from './../IconButton';

export default class ProductBar extends Component {
  template() {
    const { price } = this.$props;

    return `
      <div class="product-bar-details">
        <div class="image-wrapper">
          <img src="https://user-images.githubusercontent.com/48883344/125425011-27afda53-2637-4d27-be86-ee2f6ccd78ef.png" alt="좋아요 버튼" />
        </div>
        <span class="product-price">${price}</span>
      </div>
      <div class="button">BUTTON</div>
    `;
  }

  mounted() {
    const $imageWrapper = this.$target.querySelector('.image-wrapper');

    new IconButton($imageWrapper as HTMLElement, {
      name: 'heart',
    });
  }
}
