import './styles';
import Component from '../../../core/Component';

interface PropsType {
  info: string;
  name: string;
  location: string;
}

export default class InfoSaler extends Component {
  template() {
    const { info, name, location }: PropsType = this.$props;

    return `
      <p class="sub-title">판매자 정보</p>
      <div class="user-area">
        <p class="username">우아해지고 싶은 사람</p>
        <p class="location">역삼동</p>
      </div>
    `;
  }
}
