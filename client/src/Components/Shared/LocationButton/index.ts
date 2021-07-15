import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton/index';

interface PropsType {
  type: string;
  text?: string;
}

export default class LocationButton extends Component {
  template() {
    const { type, text }: PropsType = this.$props;

    return `
      <div class="location-button ${type}">
        <small class="text">${text}</small>
        <div class="image-wrapper"></div>
      </div>
    `;
  }

  mounted() {
    const { type } = this.$props;
    const $wrapper = this.$target.querySelector('.image-wrapper');

    switch (type) {
      case 'active':
        new IconButton($wrapper as HTMLElement, {
          name: 'close-mint',
        });
        break;

      case 'add':
        new IconButton($wrapper as HTMLElement, {
          name: 'add-mint',
        });

      default:
        break;
    }
  }

  setEvent() {
    const $location = this.$target.parentElement?.parentElement;

    this.addEvent('click', '.add', () => handleClickOnAddBtn());

    function handleClickOnAddBtn() {
      const $modal = $location?.querySelector('.location-modal');
      $modal?.classList.add('modal-open');
    }
  }
}
