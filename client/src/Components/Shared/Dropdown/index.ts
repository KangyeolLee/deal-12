import './styles';
import Component from '../../../core/Component';

interface DropdownListType {
  isWarning?: boolean;
  text: string;
  onclick: Function;
}

export default class Dropdown extends Component {
  setup() {
    const { offset } = this.$props;
    const $dropdown = document.createElement('ul');
    $dropdown.classList.add('dropdown', offset);
    this.$target.append($dropdown);
    this.$target.style.position = 'relative';
  }

  mounted() {
    const { lists, offset } = this.$props;
    const $dropdown = this.$target.querySelector('.dropdown') as HTMLElement;

    const dropdownOpener = $dropdown?.parentElement;

    // const dropdownItems = lists
    //   .map((list: DropdownListType) => {
    //     return `
    //     <li class="dropdown-item ${list.isWarning ? 'warning' : ''}">
    //       ${list.text}
    //     </li>
    //   `;
    //   })
    //   .join('');
    // $dropdown!.innerHTML = dropdownItems;

    // template literal로 이벤트콜백 `<li onclick=${onclick}>...</li>` 를 넣는 방법이 있을까요오오?

    lists.forEach((list: DropdownListType) => {
      const { isWarning, text, onclick } = list;
      const $li = document.createElement('li');
      $li.classList.add('dropdown-item');
      if (isWarning) $li.classList.add('warning');
      $li.innerText = text;
      $li.addEventListener('click', () => onclick());
      $dropdown.append($li);
    });

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
