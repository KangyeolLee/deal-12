import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton';
import Dropdown from './../Dropdown/index';

export default class Status extends Component {
  template() {
    const { text } = this.$props;

    return `
        <span>${text}</span>
        <div class="icon-button"></div>
        <ul class="dropdown"></ul>
    `;
  }

  mounted() {
    const $status = this.$target.querySelector('.icon-button');
    const $dropdown = this.$target.querySelector('.dropdown');

    new IconButton($status as HTMLElement, {
      path: '../../../assets/down-xs.svg',
    });

    new Dropdown($dropdown as HTMLElement, {
      lists: [
        { text: '예약중으로 변경', isWarning: false },
        { text: '판매완료로 변경', isWarning: false },
      ],
      onclick: () => console.log(1),
      offset: 'left',
    });
  }
}
