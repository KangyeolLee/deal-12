import './styles';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import ProductBar from './../Shared/ProductBar/index';
import InfoSaler from './../Shared/InfoSaler/index';
import Status from './../Shared/Status/index';
import { $router } from '../../lib/router';
import ImgBox from './../Shared/ImgBox/index';
import Dropdown from '../Shared/Dropdown';

export default class SalesProductDetail extends Component {
  setup() {
    // 추후 getProductById(id)와 같은 API를 통해 값을 가져오고
    // 이를 this.$state 에 할당하는 것으로 변경

    this.$state = {
      title: '우아한 옷 팔아요',
      image:
        'https://flexible.img.hani.co.kr/flexible/normal/700/1040/imgdb/original/2021/0428/20210428504000.jpg',
      content: `이 옷 입으시면 우아한 사람이 될 수 있습니다. 몇 번 안 입어서 저는 우아한 사람이 되지 못한 것 같습니다. 네고 가능해요. 프리사이즈로 남녀노소 모두 입으실 수 있습니다. 연락주세용 제에바알
        이 옷 입으시면 우아한 사람이 될 수 있습니다. 몇 번 안 입어서 저는 우아한 사람이 되지 못한 것 같습니다. 네고 가능해요. 프리사이즈로 남녀노소 모두 입으실 수 있습니다. 연락주세용 제에바알`,
      price: '69,000원',
      users: {
        name: '우아해지고 싶은 사람',
        location: '역삼동',
      },
    };
  }

  template() {
    const { title, content } = this.$state;

    return `
      <div class="product-wrapper">
        <header></header>
        <div class="product-detail">
          <div class="image-wrapper"></div>
          <div class="content">
            <div class="status-button"></div>
            <div class="product-description">
              <h1 class="product-title">${title}</h1>
              <p class="category">기타 중고물품 · 3시간 전</p>
              <p class="desc">${content}</p>
              <p class="more-info"> 채팅 0 · 관심 0 · 조회 1 </p>
            </div>
            <div class="user-specification"></div>
          </div>
          <div class="dropdown-area"></div>
        </div>
        <div class="product-bar"></div>
      <div>
    `;
  }

  mounted() {
    const { price, image } = this.$state;
    const $productDetail = this.$target.querySelector('.product-bar');
    const $header = this.$target.querySelector('header');
    const $userSpecification = this.$target.querySelector(
      '.user-specification'
    );
    const $status = this.$target.querySelector('.status-button');
    const $imageWrapper = this.$target.querySelector('.image-wrapper');

    new Header($header as Element, {
      headerType: 'menu-invisible',
    });

    new ProductBar($productDetail as Element, {
      price,
    });

    new ImgBox($imageWrapper as HTMLElement, {
      imgType: 'gradient',
      img: image,
    });

    new InfoSaler($userSpecification as HTMLLIElement, this.$state.users);
    new Status($status as Element, {
      text: '판매중',
    });

    const $moreBtn = $header?.querySelector('#right');
    new Dropdown($moreBtn as HTMLElement, {
      lists: [
        {
          text: '수정하기',
          isWarning: false,
          onclick: () => console.log('수정이벤트 발생'),
        },
        {
          text: '삭제하기',
          isWarning: true,
          onclick: () => console.log('삭제이벤트 발생'),
        },
      ],
      offset: 'right',
    });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => $router.push('/home'));
  }
}
