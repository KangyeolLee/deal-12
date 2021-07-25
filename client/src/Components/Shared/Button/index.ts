import { addWhite } from '../../../../assets';
import Component from '../../../core/Component';
import IconButton from '../../Shared/IconButton';
import './styles.scss';

type ButtonType = 'medium' | 'large' | 'fab' | 'tap' | 'category';
interface HeaderProps {
  buttonType: ButtonType;
  title?: string;
  isClicked?: boolean;
  handleClick: Function;
  disabled?: boolean;
}

export default class Button extends Component {
  template() {
    const {
      buttonType,
      title,
      isClicked,
      disabled = false,
    }: HeaderProps = this.$props;

    return `
    <button id="button" ${disabled ? 'disabled' : ''} class="${buttonType} ${
      isClicked ? 'active' : ''
    }">
        ${title ? title : ''}
    </button>`;
  }

  mounted() {
    const { title }: HeaderProps = this.$props;
    if (!title) {
      const $addIcon = document.createElement('div');
      new IconButton($addIcon as Element, {
        img: addWhite,
      });
      this.$target.querySelector('#button')?.append($addIcon);
    }
  }

  setEvent() {
    const { handleClick }: HeaderProps = this.$props;
    this.$target.querySelector('#button')?.addEventListener('click', () => {
      handleClick();
    });
  }
}
