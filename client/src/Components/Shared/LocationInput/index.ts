import Component from '../../../core/Component';
import TextInput from '../TextInput';
import './styles';

export default class LocationInput extends Component {
  template() {
    return `
    <label for="userLoc">${this.$props.label}
        <div class="user-location"></div>
        <div style="position: relative;">
            <div id="autocomplete"></div>
            <div id="loc-error" class="error"></div>
        </div>
    </label>
    `;
  }

  mounted() {
    const $userLocation = this.$target.querySelector(
      '.user-location'
    ) as HTMLElement;
    const $locError = this.$target.querySelector(
      '#loc-error'
    ) as HTMLDivElement;

    new TextInput($userLocation, {
      type: 'text',
      placeholder: '시·구 제외, 동만 입력',
      size: 'large',
      id: 'userLoc',
    });

    // 주소 자동완성
    $userLocation?.querySelector('input')?.addEventListener('input', () => {
      const $autocomplete = this.$target.querySelector(
        '#autocomplete'
      ) as Element;
      let wordToMatch = $userLocation.querySelector('input')?.value;

      // 정규식
      let result = wordToMatch
        ? this.$props.locations.filter((loc: any) => {
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
  }
}
