import './styles';
import Component from '../../core/Component';
import TextInput from '../Shared/TextInput/index';
import Button from '../Shared/Button/index';
import Header from '../Shared/Header/index';
import LocationInput from '../Shared/LocationInput';

export default class Register extends Component {
  setup() {
    this.$state = {
      locations: [],
    };
    fetch('/api/main/locations', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ locations: result });
      });
  }

  template() {
    return `
      <header></header>
      <form id="register-form">
        <label for="userId">아이디
          <div class="user-email"></div>
          <div style="position: relative;">
            <div id="nickname-error" class="error"></div>
          </div>
        </label>

        <div id="location-input" style="width: 100%"></div>

        <div class="register-btn"></div>
      </form>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header') as HTMLElement;
    const $userEmail = this.$target.querySelector('.user-email') as HTMLElement;
    const $locationInput = this.$target.querySelector(
      '#location-input'
    ) as HTMLElement;
    const $registerBtn = this.$target.querySelector(
      '.register-btn'
    ) as HTMLElement;
    const $nicknameError = this.$target.querySelector(
      '#nickname-error'
    ) as HTMLDivElement;

    new Header($header, {
      title: '회원가입',
      headerType: 'menu-off-white',
    });

    new TextInput($userEmail, {
      type: 'text',
      placeholder: '영문, 숫자 조합 20자 이하',
      size: 'large',
      id: 'userId',
    });

    new LocationInput($locationInput, {
      label: '우리 동네',
      locations: this.$state.locations,
    });

    new Button($registerBtn, {
      buttonType: 'large',
      title: '회원가입',
      handleClick: () => {
        const userLocation = this.$target
          .querySelector('.user-location')
          ?.querySelector('input')?.value;

        const { id } = this.$state.locations.find(
          (loc: any) => loc.name === userLocation
        );
        fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userdata: {
              nickname: $userEmail?.querySelector('input')?.value,
              location1_id: id,
            },
          }),
        }).then((res) => {
          if (res.status === 300) {
            $nicknameError.innerText = '이미 존재하는 닉네임입니다.';
          } else if (res.status === 200) {
            this.$target.className = 'modal-close';
          }
        });
      },
    });

    const $button = $registerBtn?.querySelector('#button') as HTMLButtonElement;
    $button.disabled = true;

    // 필수입력 검증
    this.$target.addEventListener('input', () => {
      const $inputs = this.$target.querySelectorAll('input');
      const isActivated = [...$inputs].every((input) => input.value);
      const $locError = this.$target.querySelector(
        '#loc-error'
      ) as HTMLDivElement;
      $nicknameError.innerText = '';

      if (isActivated && !$locError.innerText && !$nicknameError.innerText) {
        $button.disabled = false;
      } else {
        $button.disabled = true;
      }
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
