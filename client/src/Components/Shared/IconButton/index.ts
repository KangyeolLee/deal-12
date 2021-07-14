import Component from '../../../core/Component';

interface IconButtonProps {
  name: string;
}

export default class IconButton extends Component {
  template() {
    const { name }: IconButtonProps = this.$props;

    return `<div style="background-image: url(../../../../assets/${name}.svg); width: 2.4rem; height: 2.4rem; cursor: pointer;"></div>`;
  }
}
