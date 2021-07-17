import Component from '../../../core/Component';

export default class NavItem extends Component {
  template() {
    const images = this.$props;

    return images
      .map((_, index: number) => {
        return `
        <div class="nav-item image-target-${index} ${
          index === 0 ? 'on' : ''
        }"></div>
      `;
      })
      .join('');
  }
}
