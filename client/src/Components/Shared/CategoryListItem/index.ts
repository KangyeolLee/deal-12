import Component from '../../../core/Component';
import IconButton from '../IconButton';
import ImgBox from '../ImgBox';
import './styles.scss';

export interface CategoryListItemProps {
  title: string;
  img: string;
  price: number;
  location: string;
  timestamp: string;
  commentNum: number;
  likeNum: number;
  pageName: string;
}

export default class CategoryListItem extends Component {
  setup() {
    this.$state = {
      isLiked: false, // getLikes 해서 현재 postId와 비교
    };
  }
  template() {
    const {
      title,
      price,
      location,
      timestamp,
      commentNum,
      likeNum,
    }: CategoryListItemProps = this.$props;

    return `
    <div class="item-box">
        <div id="img-box"></div>
        <div id="icon-btn"></div>
        <div class="info">
            <div>
                <div class="info__title">${title}</div>
                <div class="info__location">${location} ∙ ${timestamp}</div>
                <div class="info__price">${price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
            </div>
            <div class="info__counts">
                ${
                  commentNum !== 0 &&
                  `<div class="info__counts--count">${commentNum}</div>`
                }
                ${
                  likeNum !== 0 &&
                  `<div class="info__counts--count">${likeNum}</div>`
                }
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
  }

  mounted() {
    const { pageName } = this.$props;
    const { isLiked } = this.$state;

    const $img = this.$target.querySelector('#img-box');
    new ImgBox($img as Element, {
      imgType: 'large',
    });

    const $iconBtn = this.$target.querySelector('#icon-btn');
    $iconBtn?.addEventListener('click', () => {
      this.setState({ isLiked: !isLiked });
    });
    let name = '';
    if (pageName === 'menu') {
      name = 'more';
    } else {
      if (isLiked) name = 'heart-fill';
      else name = 'heart';
    }
    new IconButton($iconBtn as Element, {
      name,
    });
  }
}
