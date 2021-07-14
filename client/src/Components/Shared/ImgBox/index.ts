import Component from '../../../core/Component';
import './styles.scss';

type ImgType = 'small' | 'medium' | 'large' | 'gradient';
interface ImgBoxProps {
  imgType: ImgType;
  url?: string;
}

export default class ImgBox extends Component {
  template() {
    const { imgType }: ImgBoxProps = this.$props;

    return `<div class="imgbox-${imgType}"></div>`;
  }
}
