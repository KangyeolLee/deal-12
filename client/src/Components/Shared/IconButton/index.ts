import Component from '../../../core/Component';

interface IconButtonProps {
  path: string;
  onClick: Function;
}

export default class IconButton extends Component {
  template() {
    const { path }: IconButtonProps = this.$props;

    return `<div style="background-image: url(${path}); width: 2.4rem; height: 2.4rem; cursor: pointer;"></div>`;
  }
  setEvent() {
    const { onClick }: IconButtonProps = this.$props;

    this.addEvent('click', 'div', onClick);
  }
}
