import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton/index';
import { addMint, closeMint } from '../../../../assets';

export interface LocationButtonProps {
  locId: number;
  type: string;
  name?: string;
}

export default class LocationButton extends Component {
  template() {
    const { name, type }: LocationButtonProps = this.$props;

    return `
      <div class="location-button ${
        type !== 'add' ? (type === 'loc1' ? 'active' : 'inactive') : 'add'
      }">
        <small class="text">${name}</small>
        <div class="image-wrapper"></div>
      </div>
    `;
  }

  mounted() {
    const { type } = this.$props;
    const $wrapper = this.$target.querySelector('.image-wrapper');

    if (type === 'add') {
      new IconButton($wrapper as HTMLElement, {
        img: addMint,
      });
    } else {
      new IconButton($wrapper as HTMLElement, {
        img: closeMint,
      });
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
