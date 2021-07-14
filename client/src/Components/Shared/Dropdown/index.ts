import './styles';
import Component from '../../../core/Component';

export default class Dropdown extends Component {
  template() {
    const { lists } = this.$props;

    return `
      ${lists
        .map(
          (list) =>
            `<li class="dropdown-item ${list.isWarning ? 'warning' : ''}">${
              list.text
            }</li>`
        )
        .join('')}
    `;
  }

  mounted() {
    const { offset } = this.$props;
    const dropdownOpener = this.$target.parentElement;

    const toggleDropdown = () => {
      const currentStatus = this.$target.style.display;

      if (!currentStatus || currentStatus === 'none') {
        this.$target.style.display = 'block';
      } else {
        this.$target.style.display = 'none';
      }
    };

    this.$target?.classList.add(offset);
    dropdownOpener.addEventListener('click', toggleDropdown);
  }

  setEvent() {
    const { onclick } = this.$props;

    this.addEvent('click', 'li', onclick);
  }
}
