import { $router } from '../../../lib/router';
import Component from '../../../core/Component';
import IconButton from '../IconButton';
import ImgBox from '../ImgBox';
import './styles.scss';
import { getTimestamp, token } from '../../../lib/util';

export interface CategoryListItemProps {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  name: string;
  createdAt: string;
  chat_count: number;
  interest_count: number;
  pageName: string;
}

class LikeBtn extends Component {
  setup() {
    this.$state = {
      isLiked: false,
    };

    const headers = new Headers();
    headers.append('Authorization', token());

    fetch(`/api/posts/${this.$props.postId}/interest/check`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then(({ result }) => {
        if (result) this.setState({ isLiked: true });
      });
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
    const headers = new Headers();
    headers.append('Authorization', token());

    this.addEvent('click', '#icon-btn', () => {
      this.setState({ isLiked: !this.$state.isLiked });
      if (this.$state.isLiked) {
        // create postinterest
        fetch(`/api/posts/${this.$props.postId}/interest`, {
          method: 'POST',
          headers,
        }).then((r) => console.log(r));
      } else {
        // delete postinterest
        fetch(`/api/posts/${this.$props.postId}/interest`, {
          method: 'DELETE',
          headers,
        }).then((r) => console.log(r));
      }
    });
  }
}

export default class CategoryListItem extends Component {
  template() {
    const {
      title,
      price,
      name,
      createdAt,
      chat_count = 3,
      interest_count,
    }: CategoryListItemProps = this.$props;

    return `
    <div class="item-box">
        <div id="img-box"></div>
        <div id="icon-btn"></div>
        <div class="info">
            <div>
                <div class="info__title">${title}</div>
                <div class="info__location">${name} ∙ ${getTimestamp(
      createdAt
    )}</div>
                <div class="info__price">${price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
            </div>
            <div class="info__counts">
                ${
                  chat_count !== 0 &&
                  `<div class="info__counts--count">
                      <div id="chat-icon"></div>
                      <div>${chat_count}</div>
                  </div>`
                }
                ${
                  interest_count !== 0 &&
                  `<div class="info__counts--count">
                      <div id="heart-icon"></div>
                      <div>${interest_count}</div>
                  </div>`
                }
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
  }

  mounted() {
    const { pageName, thumbnail, chat_count = 3, interest_count } = this.$props;

    const $img = this.$target.querySelector('#img-box');
    new ImgBox($img as Element, {
      imgType: 'large',
      img: thumbnail,
    });

    const $iconBtn = this.$target.querySelector('#icon-btn');
    if (pageName === 'menu') {
      new IconButton($iconBtn as Element, {
        pageName,
      });
    } else {
      new LikeBtn($iconBtn as Element, {
        postId: this.$props.id,
      });
    }

    // small icons
    if (chat_count > 0) {
      const $chatIcon = this.$target.querySelector('#chat-icon') as HTMLElement;
      new IconButton($chatIcon as Element, {
        name: 'chat-small',
        small: true,
      });
    }
    if (interest_count > 0) {
      const $heartIcon = this.$target.querySelector('#heart-icon');
      new IconButton($heartIcon as Element, {
        name: 'heart-small',
        small: true,
      });
    }
  }

  setEvent() {
    this.addEvent(
      'click',
      '.item-box',
      ({ target }: { target: HTMLElement }) => {
        if (target.className !== 'icon-btn') {
          $router.push('/post/1');
        }
      }
    );
  }
}
