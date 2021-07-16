import './styles';
import Component from '../../../core/Component';

interface PropsType {
  placeholder: string;
  type: string;
  size: string;
  id?: string;
}

export default class TextInput extends Component {
  template() {
    const { placeholder, type, size, id }: PropsType = this.$props;

    return `
      <input id="${
        id ? id : ''
      }" class="text-input size-${size}" placeholder="${placeholder}" type="${type}" />
    `;
  }
}
