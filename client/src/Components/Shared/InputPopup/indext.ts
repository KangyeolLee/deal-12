import './styles';
import Component from '../../../core/Component';
import TextInput from './../TextInput/index';
import LocationInput from '../LocationInput';
import { token } from '../../../lib/util';

export default class InputPopup extends Component {
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
    const { message, btnText, inputType } = this.$props;
    return `
      <div class="input-popup">
        <h6 class="sub-title">${message}</h6>
        <div class="input-wrapper ${
          inputType === 'alert' ? 'hidden' : ''
        }"></div>
        <div class="buttons-area">
          <div class="close-btn">취소</div>
          <div class="confirm-btn ${
            inputType === 'alert' ? 'alert' : ''
          }">${btnText}</div>
        </div>
      </div>
    `;
  }

  mounted() {
    const { inputType } = this.$props;

    if (inputType === 'location') {
      const $wrapper = this.$target.querySelector('.input-wrapper');
      new TextInput($wrapper as HTMLElement, {
        placeholder: '시·구 제외, 동만 입력',
        type: 'text',
        size: 'medium',
      });
      new LocationInput($wrapper as HTMLElement, {
        locations: this.$state.locations,
      });
    }
  }

  setEvent() {
    const { inputType } = this.$props;
    const $modal = this.$target;
    const error = document.querySelector('.error')?.innerHTML;

    this.addEvent('click', '.close-btn', turnOffModal);

    function turnOffModal() {
      $modal.classList.remove('modal-open');
    }

    if (inputType === 'location') {
      this.addEvent(
        'input',
        'input',
        ({ target }: { target: HTMLInputElement }) => {
          const $confirmBtn = this.$target.querySelector('.confirm-btn');

          if (target.value && !error) {
            $confirmBtn?.classList.add('on');
            return;
          }

          $confirmBtn?.classList.remove('on');
        }
      );

      this.addEvent('click', '.confirm-btn', () => {
        const $input = this.$target.querySelector('input');

        if ($input?.value && !error) {
          const locId = this.$state.locations.find(
            (loc: any) => loc.name === $input.value
          ).id;

          fetch('/api/me/locations', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token(),
            },
            body: JSON.stringify({
              user: {
                location2_id: locId,
              },
            }),
          }).then((r) => console.log(r));
        }
      });
    }
  }
}
