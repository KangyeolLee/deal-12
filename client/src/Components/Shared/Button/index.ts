import Component from '../../../core/Component';
import IconButton from '../../Shared/IconButton';
import './styles.scss';

type ButtonType = 'medium' | 'large' | 'fab' | 'tap';
interface HeaderProps {
  buttonType: ButtonType;
  title?: string;
  isClicked?: boolean;
  handleClick: Function;
}

export default class Button extends Component {
  template() {
    const { buttonType, title, isClicked }: HeaderProps = this.$props;

    return `
    <button id="button" class="${buttonType} ${isClicked ? 'active' : ''}">
        ${title ? title : ''}
    </button>`;
  }

  mounted() {
    const { title }: HeaderProps = this.$props;
    if (!title) {
      const $addIcon = document.createElement('div');
      new IconButton($addIcon as Element, {
        name: 'add-white',
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
