// import { $router } from '../lib/router.js';

import Component from '../../../core/Component';
import './styles.scss';

export interface CategoryListItemProps {
  title: string;
  img: string;
  price: number;
  location: string;
  timestamp: string;
  isLiked: boolean;
  commentNum: number;
  likeNum: number;
}

export default class CategoryListItem extends Component {
  template() {
    const {
      title,
      price,
      location,
      timestamp,
      //   isLiked,
      commentNum,
      likeNum,
    }: CategoryListItemProps = this.$props;

    return `
    <div class="item-box">
        <div class="img"></div>
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
}
