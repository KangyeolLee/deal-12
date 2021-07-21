import './styles';
import Component from '../../core/Component';
import Header from './../Shared/Header/index';
import { $router } from '../../lib/router';
import LocationButton from './../Shared/LocationButton/index';
import InputPopup from './../Shared/InputPopup/indext';
import { token } from '../../lib/util';

export default class Location extends Component {
  setup() {
    this.$state = {
      location1: {},
      location2: {},
    };
    fetch('/api/me/locations', {
      method: 'GET',
      headers: {
        Authorization: token(),
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result);
        this.setState({
          location1: result.loc1[0],
          location2: result.loc2[0],
        });
      })
      .then(() => {
        const $buttonArea = this.$target.querySelector('.button-area');
        const { location1, location2 } = this.$state;

        const $location = document.createElement('div');
        const $addLocation = document.createElement('div');

        $buttonArea?.append($location);
        new LocationButton($location as HTMLElement, {
          locId: location1.id,
          type: 'loc1',
          name: location1.name,
        });

        if (location2?.id) {
          console.log('a');
          $buttonArea?.append($addLocation);
          new LocationButton($addLocation as HTMLElement, {
            locId: location2.id,
            type: 'loc2',
            name: location2.name,
          });
        } else {
          console.log('b');
          $buttonArea?.append($addLocation);
          new LocationButton($addLocation as HTMLElement, {
            type: 'add',
          });
        }
      });
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
