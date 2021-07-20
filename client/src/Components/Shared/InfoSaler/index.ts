import './styles';
import Component from '../../../core/Component';

interface PropsType {
  name: string;
  nickname: string;
}

export default class InfoSaler extends Component {
  template() {
    const { name, nickname }: PropsType = this.$props;

    return `
      <p class="sub-title">판매자 정보</p>
      <div class="user-area">
        <p class="username">${nickname}</p>
        <p class="location">${name}</p>
      </div>
    `;
  }
}
