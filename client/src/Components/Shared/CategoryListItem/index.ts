import { $router } from '../../../lib/router';
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
  chatNum: number;
  likeNum: number;
  pageName: string;
}

class LikeBtn extends Component {
  setup() {
    this.$state = {
      isLiked: false, // getLikes 해서 현재 postId와 비교
    };
  }
  template() {
    return `<div></div>`;
  }
  mounted() {
    const { isLiked } = this.$state;
    const $iconBtn = this.$target.querySelector('div');

    new IconButton($iconBtn as Element, {
      name: isLiked ? 'heart-fill' : 'heart',
    });
  }
  setEvent() {
    this.addEvent('click', '#icon-btn', () => {
      this.setState({ isLiked: !this.$state.isLiked });
    });
  }
}

export default class CategoryListItem extends Component {
  template() {
    const {
      title,
      price,
      location,
      timestamp,
      chatNum,
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
                  chatNum !== 0 &&
                  `<div class="info__counts--count">
                      <div id="chat-icon"></div>
                      <div>${chatNum}</div>
                  </div>`
                }
                ${
                  likeNum !== 0 &&
                  `<div class="info__counts--count">
                      <div id="heart-icon"></div>
                      <div>${likeNum}</div>
                  </div>`
                }
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
  }

  mounted() {
    const { pageName, img } = this.$props;

    const $img = this.$target.querySelector('#img-box');
    new ImgBox($img as Element, {
      imgType: 'large',
      img: img,
    });

    const $iconBtn = this.$target.querySelector('#icon-btn');
    if (pageName === 'menu') {
      new IconButton($iconBtn as Element, {
        pageName,
      });
    } else {
      new LikeBtn($iconBtn as Element);
    }

    // small icons
    const $chatIcon = this.$target.querySelector('#chat-icon') as HTMLElement;
    $chatIcon.style.width = '1.6rem';
    $chatIcon.style.height = '1.6rem';
    const $heartIcon = this.$target.querySelector('#heart-icon');
    new IconButton($chatIcon as Element, {
      name: 'chat-small',
      small: true,
    });
    new IconButton($heartIcon as Element, {
      name: 'heart-small',
      small: true,
    });
  }

  setEvent() {
    this.addEvent(
      'click',
      '.item-box',
      ({ target }: { target: HTMLElement }) => {
        console.log(target.className);
        if (target.className === 'icon-btn') {
          this.setState({ isLiked: !this.$state.isLiked });
        } else {
          $router.push('/post/1');
        }
      }
    );
  }
}
