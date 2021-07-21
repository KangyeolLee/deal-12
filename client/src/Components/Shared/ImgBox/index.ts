import Component from '../../../core/Component';
import './styles.scss';

type ImgType = 'small' | 'medium' | 'large' | 'gradient';
interface ImgBoxProps {
  imgType: ImgType;
  img?: string;
}

export default class ImgBox extends Component {
  template() {
    const { imgType, img }: ImgBoxProps = this.$props;

    return `<div style="background-image: url('${img}')" class="imgbox-${imgType}"></div>`;
  }

}
