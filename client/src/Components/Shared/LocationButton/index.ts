import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton/index';

export interface LocationButtonProps {
  locId: number;
  idx: number;
  name?: string;
}

export default class LocationButton extends Component {
  template() {
    const { name, idx }: LocationButtonProps = this.$props;

    return `
      <div class="location-button ${idx === 0 ? 'active' : 'add'}">
        <small class="text">${name}</small>
        <div class="image-wrapper"></div>
      </div>
    `;
  }

  mounted() {
    const { idx } = this.$props;
    const $wrapper = this.$target.querySelector('.image-wrapper');

    switch (idx) {
      case 0:
        new IconButton($wrapper as HTMLElement, {
          name: 'close-mint',
        });
        break;

      case 1:
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
