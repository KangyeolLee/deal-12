import './styles';
import Component from '../../core/Component';
import Header from './../Shared/Header/index';
import { $router } from '../../lib/router';
import LocationButton from './../Shared/LocationButton/index';
import InputPopup from './../Shared/InputPopup/indext';

interface PropsType {
  type: string;
  text?: string;
}

export default class Location extends Component {
  setup() {
    // 임시 유저 위치 정보
    this.$state = [
      {
        type: 'active',
        text: '역삼동',
      },
      // {
      //   type: 'inactive',
      //   text: '양재동',
      // },
    ];
  }

  template() {
    return `
      <header></header>
      <div id="location">
        <div class="guide-message">
          <p>지역은 최소 1개 이상</p>
          <p>최대 2개까지 설정 가능해요.</p>
        </div>
        <div class="button-area"></div>
        <div class="location-modal"></div>
      </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as HTMLElement, {
      title: '내 동네 설정하기',
      headerType: 'menu-off-white',
    });

    const $buttonArea = this.$target.querySelector('.button-area');
    const locations = this.$state.slice(0, 2);

    if (locations.length === 1) {
      const $location = document.createElement('div');
      $buttonArea?.append($location);
      new LocationButton($location as HTMLElement, locations[0]);

      const $addLocation = document.createElement('div');
      $buttonArea?.append($addLocation);
      new LocationButton($addLocation as HTMLElement, {
        type: 'add',
      });
    } else {
      locations.forEach((loc: PropsType) => {
        const $location = document.createElement('div');
        $buttonArea?.append($location);
        new LocationButton($location as HTMLElement, loc);
      });
    }

    const $modal = this.$target.querySelector('.location-modal');
    new InputPopup($modal as HTMLElement, {
      message: '우리 동네를 입력하세요.',
      inputType: 'location',
      btnText: '확인',
    });

    const $backBtn = $header?.querySelector('#left');
    $backBtn?.addEventListener('click', () => $router.push('/home'));
  }
}
