import Component from '../../../core/Component';
import './styles.scss';

interface IconButtonProps {
  name: string;
  small?: boolean;
}

export default class IconButton extends Component {
  template() {
    const { name, small }: IconButtonProps = this.$props;

    return `<div class="${
      small ? 'icon-btn small' : 'icon-btn'
    }" style="background-image: url(../../../../assets/${name}.svg)"></div>`;
  }
}
