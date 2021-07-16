import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton';
import Dropdown from './../Dropdown/index';

interface PropsType {
  text: string;
  readonly?: boolean;
}

export default class Status extends Component {
  template() {
    const { text, readonly } = this.$props as PropsType;

    return `
        <span>${text}</span>
        <div class="icon-button ${readonly ? 'hidden' : ''}"></div>
    `;
  }

  mounted() {
    const { readonly } = this.$props as PropsType;

    const $status = this.$target.querySelector('.icon-button');
    const $dropdown = this.$target;

    if (readonly) {
      return;
    }

    new IconButton($status as HTMLElement, {
      name: 'down-xs',
    });

    new Dropdown($dropdown as HTMLElement, {
      lists: [
        {
          text: '예약중으로 변경',
          isWarning: false,
          onclick: () => console.log('예약중'),
        },
        {
          text: '판매완료로 변경',
          isWarning: false,
          onclick: () => console.log('판매완료'),
        },
      ],
      offset: 'left',
    });
  }
}
