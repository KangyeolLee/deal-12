import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton';
import Dropdown from './../Dropdown/index';
import { token } from './../../../lib/util';

interface PropsType {
  id: number;
  text: string;
  readonly?: boolean;
}

export default class Status extends Component {
  setup() {
    this.$state = {
      text: this.$props.text,
    }
  }

  template() {
    const { readonly } = this.$props as PropsType;

    return `
        <span>${this.$state.text}</span>
        <div class="icon-button ${readonly ? 'hidden' : ''}"></div>
    `;
  }

  mounted() {
    const headers = new Headers();
    headers.append('Authorization', token());
    headers.append('Content-Type', 'application/json');

    const { id, readonly } = this.$props as PropsType;

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
          onclick: () => {
            fetch(`/api/posts/${id}/state`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({
                state: '예약중',
              })
            })
              .then(res => res.json())
              .then(data => {
                const { result : { affectedRows } } = data;
                if (affectedRows) {
                  this.setState({ text: '예약중' })
                }
              })
          },
        },
        {
          text: '판매완료로 변경',
          isWarning: false,
          onclick: () => {
            fetch(`/api/posts/${id}/state`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({
                state: '판매완료',
              })
            })
              .then(res => res.json())
              .then(data => {
                const { result : { affectedRows } } = data;
                if (affectedRows) {
                  this.setState({ text: '판매완료' })
                }
              })
          },
        },
      ],
      offset: 'left',
    });
  }
}
