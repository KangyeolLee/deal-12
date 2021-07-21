import './styles';
import Component from '../../../core/Component';

interface DropdownListType {
  isWarning?: boolean;
  text: string;
  state?: string;
  onclick: Function;
}

export default class Dropdown extends Component {
  setup() {
    const { offset } = this.$props;
    const $dropdown = document.createElement('ul');
    $dropdown.classList.add('dropdown', offset);
    this.$target.append($dropdown);
    (<HTMLElement>this.$target).style.position = 'relative';
  }

  mounted() {
    const { lists, offset } = this.$props;
    const $dropdown = this.$target.querySelector('.dropdown') as HTMLElement;

    const dropdownOpener = $dropdown?.parentElement;

    lists.filter((list: DropdownListType) => {
      const { currentState } = this.$props;
      const { isWarning, text, state, onclick } = list;
      
      if ( state && currentState === state ) {
        return;
      }

      const $li = document.createElement('li');
      $li.classList.add('dropdown-item');
      if (isWarning) $li.classList.add('warning');
      $li.innerText = text;
      $li.addEventListener('click', () => onclick());
      $dropdown.append($li);
    });

    console.log($dropdown)

    const toggleDropdown = (e: MouseEvent) => {
      e.stopPropagation();
      const isOpen = $dropdown.className.includes('open-dropdown');

      if (isOpen) {
        $dropdown.classList.remove('open-dropdown');
      } else {
        $dropdown.classList.add('open-dropdown');
      }
    };

    this.$target?.classList.add(offset);
    dropdownOpener?.addEventListener('click', (e) => toggleDropdown(e));
  }

  setEvent() {
    const { onclick } = this.$props;

    this.addEvent('click', 'li', onclick);
  }
}
