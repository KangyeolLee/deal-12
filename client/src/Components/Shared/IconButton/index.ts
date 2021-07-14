import Component from '../../../core/Component';
import './styles.scss';

interface IconButtonProps {
  name: string;
}

export default class IconButton extends Component {
  template() {
    const { name }: IconButtonProps = this.$props;

    return `<div class="icon-btn" style="background-image: url(../../../../assets/${name}.svg)"></div>`;
  }
}
