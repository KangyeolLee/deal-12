import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import ProductBar from './../Shared/ProductBar/index';
import InfoSaler from './../Shared/InfoSaler/index';
import Status from './../Shared/Status/index';
import { $router } from '../../lib/router';
import Dropdown from '../Shared/Dropdown';
import ImgNavigation from './../Shared/ImgNavigation/index';
import {
  getTimestamp,
  setLoading,
  token,
  translatePriceToTrimmed,
} from '../../lib/util';
import InputPopup from '../Shared/InputPopup/index';

export default class SalesProductDetail extends Component {
  setup() {
    this.$state = {
      isLogin: false,
      isMine: false,
    };
    const postId = location.href.split('post/')[1];

    setLoading(true);

    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        const { result } = data;
        const postDetail = result[0];
        this.setState(postDetail);
      })
      .finally(() => setLoading(false));

    if (token()) {
      const headers = new Headers();
      headers.append('Authorization', token());

      const isLogin = { isLogin: true };

      setLoading(true);

      fetch(`/api/posts/${postId}/check`, {
        method: 'GET',
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ ...data, ...isLogin });
        })
        .finally(() => setLoading(false));
    }
  }

  template() {
    const {
      isMine,
      title,
      content,
      category,
      updatedAt,
      interest_count,
      chatroom_count,
      view_count,
    } = this.$state;

    return `
      <div class="product-wrapper">
        <header></header>
        <div class="product-detail">
          <div class="image-slider"></div>
          <div class="content">
            <div class="status-button ${isMine ? '' : 'hidden'}"></div>
            <div class="product-description">
              <h1 class="product-title">${title}</h1>
              <p class="product-category">${category} · ${getTimestamp(
      updatedAt
    )}</p>
              <p class="desc">${content}</p>
              <p class="more-info"> 채팅 ${chatroom_count} · 관심 ${interest_count} · 조회 ${view_count} </p>
            </div>
            <div class="user-specification"></div>
          </div>
          <div class="dropdown-area"></div>
        </div>
        <div class="product-bar"></div>
        <div class="product-modal"></div>
      <div>
    `;
  }

  mounted() {
    const { id, isMine, isLogin, price, state, nickname, name, seller_id } =
      this.$state;
    const $productDetail = this.$target.querySelector('.product-bar');
    const $header = this.$target.querySelector('header');
    const $userSpecification = this.$target.querySelector(
      '.user-specification'
    );
    const $status = this.$target.querySelector('.status-button');
    const $imageWrapper = this.$target.querySelector('.image-slider');
    const $modal = this.$target.querySelector('.product-modal');

    new Header($header as Element, {
      headerType: 'menu-invisible',
      isMine,
    });

    new ProductBar($productDetail as Element, {
      price: translatePriceToTrimmed(+price),
      isMine,
      seller_id,
      isLogin,
      post_id: location.href.split('post/')[1],
    });

    new ImgNavigation($imageWrapper as HTMLElement, {
      images: this.$state.images,
    });

    new InfoSaler($userSpecification as HTMLLIElement, { nickname, name });

    if (isMine) {
      new Status($status as Element, {
        id,
        text: state,
      });

      new InputPopup($modal as HTMLElement, {
        message: '정말로 이 게시글을 삭제하시겠습니까?',
        btnText: '삭제하기',
        inputType: 'alert',
        onclick: () => {
          fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': token(),
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.result.affectedRows) {
                $router.push('/home');
              }
            });
        },
      });
    }

    const $moreBtn = $header?.querySelector('#right');
    new Dropdown($moreBtn as HTMLElement, {
      lists: [
        {
          text: '수정하기',
          isWarning: false,
          onclick: () => $router.push(`/post/update/${id}`),
        },
        {
          text: '삭제하기',
          isWarning: true,
          onclick: () => $modal?.classList.add('modal-open'),
        },
      ],
      offset: 'right',
    });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => $router.push('/home'));
  }
}
