import './styles';
import Component from '../../core/Component';
import TextInput from './../Shared/TextInput/index';
import Button from './../Shared/Button/index';
import Header from './../Shared/Header/index';
import { $router } from '../../lib/router';
import Dropdown from '../Shared/Dropdown';

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

        <label for="userLoc">우리 동네
          <div class="user-location"></div>
          <div style="position: relative;">
            <div id="autocomplete"></div>
            <div id="loc-error" class="error"></div>
          </div>
        </label>

        <div class="register-btn"></div>
      </form>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header') as HTMLElement;
    const $userEmail = this.$target.querySelector('.user-email') as HTMLElement;
    const $userLocation = this.$target.querySelector(
      '.user-location'
    ) as HTMLElement;
    const $registerBtn = this.$target.querySelector(
      '.register-btn'
    ) as HTMLElement;
    const $locError = this.$target.querySelector(
      '#loc-error'
    ) as HTMLDivElement;
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

    new TextInput($userLocation, {
      type: 'text',
      placeholder: '시·구 제외, 동만 입력',
      size: 'large',
      id: 'userLoc',
    });

    new Button($registerBtn, {
      buttonType: 'large',
      title: '회원가입',
      handleClick: () => {
        const { id } = this.$state.locations.find(
          (loc: any) =>
            loc.name === $userLocation?.querySelector('input')?.value
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
      $nicknameError.innerText = '';

      if (isActivated && !$locError.innerText && !$nicknameError.innerText) {
        $button.disabled = false;
      } else {
        $button.disabled = true;
      }
    });

    // 주소 자동완성
    $userLocation?.querySelector('input')?.addEventListener('input', () => {
      const $autocomplete = this.$target.querySelector(
        '#autocomplete'
      ) as Element;
      let wordToMatch = $userLocation.querySelector('input')?.value;

      // 정규식
      let result = wordToMatch
        ? this.$state.locations.filter((loc: any) => {
            const regex = new RegExp(wordToMatch as string, 'gi');
            return loc.name.match(regex);
          })
        : [];

      // 에러
      let errorMessage = '';
      if (result.length > 0) {
        $autocomplete.className = 'autocomplete';
        errorMessage = '';
      } else {
        errorMessage = '올바른 주소를 입력해주세요.';
      }
      $locError.innerText = errorMessage;

      // 자동완성 template
      let autocomplete = '';
      result.forEach((r: any) => {
        autocomplete += `<div class="loc-list">${r.name}</div>`;
      });
      $autocomplete.innerHTML = autocomplete;

      // 클릭하면 입력
      this.$target.querySelectorAll('.loc-list').forEach((loc) => {
        loc.addEventListener('click', ({ target }) => {
          ($userLocation.querySelector('input') as HTMLInputElement).value = (
            target as HTMLDivElement
          ).innerText;
          $autocomplete.innerHTML = '';
          $autocomplete.className = '';
        });
      });
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      $router.push('/home');
    });
  }
}
