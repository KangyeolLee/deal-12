import './styles';
import Component from '../../../core/Component';
import Status from './../Status/index';
import ImgBox from './../ImgBox/index';

interface PropsType {
  title: string;
  price: string;
  image: string;
}

export default class InfoProduct extends Component {
  template() {
    const { title, price } = this.$props as PropsType;

    return `
      <div class="product-intro">
        <div class="image-wrapper"></div>
        <div class="product-intro__detail">
          <h6 class="title">${title}</h6>
          <p class="price">${price}</p>
        </div>
      </div>
      <div class="status-button"></div>
    `;
  }

  mounted() {
    const { image } = this.$props as PropsType;
    const $status = this.$target.querySelector('.status-button');
    const $imageWrapper = this.$target.querySelector('.image-wrapper');

    new Status($status as HTMLElement, {
      text: '판매중',
      readonly: true,
    });

    new ImgBox($imageWrapper as HTMLElement, {
      imgType: 'small',
      img: image,
    });
  }
}
