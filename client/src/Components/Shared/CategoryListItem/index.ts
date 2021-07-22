import { $router } from '../../../lib/router';
import Component from '../../../core/Component';
import IconButton from '../IconButton';
import ImgBox from '../ImgBox';
import './styles.scss';
import {
  getTimestamp,
  translatePriceToTrimmed,
  token,
} from '../../../lib/util';

export interface CategoryListItemProps {
  id: number;
  title: string;
  thumbnail: string;
  blob?: Blob;
  price: number;
  name: string;
  createdAt: string;
  chatroom_count: number;
  interest_count: number;
  pageName: string;
  seller_id: number;
}

class LikeBtn extends Component {
  setup() {
    this.$state = {
      isLiked: false,
    };

    if (token()) {
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
  }
  template() {
    return `<div></div>`;
  }
  mounted() {
    const { isLiked } = this.$state;
    const $iconBtn = this.$target.querySelector('div');

    new IconButton($iconBtn as Element, {
      name: isLiked ? 'heart-fill' : 'heart',
      disabled: !this.$props.isLogin,
    });

    const headers = new Headers();
    headers.append('Authorization', token());

    const btn = this.$target.parentNode?.querySelector(
      '#icon-btn'
    ) as HTMLButtonElement;

    const $itemBox = this.$target.parentNode?.parentNode as HTMLDivElement;

    const handleBtnClick = () => {
      const $num = $itemBox.querySelector('#count') as HTMLDivElement;
      const $icon = $itemBox.querySelector('#heart-icon') as HTMLElement;

      if (!this.$state.isLiked) {
        // create postinterest
        fetch(`/api/posts/${this.$props.postId}/interest`, {
          method: 'POST',
          headers,
        }).then(() => {
          this.setState({ isLiked: true });
          if ($num.innerText === '0') {
            $num.style.color = '#000';
            new IconButton($icon as Element, {
              name: 'heart-small',
              small: true,
            });
          }
          $num.innerText = (Number($num.innerText) + 1).toString();
        });
      } else {
        // delete postinterest
        fetch(`/api/posts/${this.$props.postId}/interest`, {
          method: 'DELETE',
          headers,
        }).then(() => {
          this.setState({ isLiked: false });
          $num.innerText = (Number($num.innerText) - 1).toString();
          if ($num.innerText === '0') {
            $num.style.color = '#fff';
            $icon.innerHTML = '';
          }
        });
      }
    };
    btn.onclick = handleBtnClick;
  }
}

export default class CategoryListItem extends Component {
  template() {
    const {
      title,
      price,
      name,
      createdAt,
      chatroom_count,
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
                <div class="info__price">${translatePriceToTrimmed(
                  price
                )}원</div>
            </div>
            <div class="info__counts">
              <div class="info__counts--count ${
                chatroom_count ? '' : 'hidden'
              }">
                  <div id="chat-icon"></div>
                  <div>${chatroom_count}</div>
              </div>
              <div id="icon" class="info__counts--count">
                  <div id="heart-icon"></div>
                  <div id="count">${interest_count}</div>
              </div>              
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
  }

  mounted() {
    const {
      myId,
      pageName,
      thumbnail,
      chatroom_count,
      interest_count,
      seller_id,
    } = this.$props;

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
      if (seller_id !== myId) {
        new LikeBtn($iconBtn as Element, {
          postId: this.$props.id,
          isLogin: this.$props.isLogin,
        });
      }
    }

    // small icons
    if (chatroom_count > 0) {
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
    } else {
      (this.$target.querySelector('#count') as HTMLDivElement).style.color =
        '#fff';
    }
  }

  setEvent() {
    const { id } = this.$props;
    this.addEvent(
      'click',
      '.item-box',
      ({ target }: { target: HTMLElement }) => {
        if (target.className !== 'icon-btn') {
          $router.push(`/post/${id}`);
        }
      }
    );
  }
}
