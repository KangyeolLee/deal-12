import Component from '../../../core/Component';
import './styles.scss';

interface IconButtonProps {
  img: string;
  small?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export default class IconButton extends Component {
  template() {
    const { img, small, disabled, hidden }: IconButtonProps = this.$props;

    return `<div class="icon-btn${small ? ' small' : ''}${
      disabled ? ' disabled' : ''
    }${hidden ? ' hidden' : ''}" style="background-image: url(${img})"></div>`;
  }
}
