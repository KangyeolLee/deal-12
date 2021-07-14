import Component from '../../../core/Component';
import IconButton from '../IconButton';
import ImgBox from '../ImgBox';
import './styles.scss';

type ButtonType = 'add' | 'delete';
interface ImgButtonProps {
  btnType: ButtonType;
  url?: string;
  imgNum?: number;
}

export default class ImgButton extends Component {
  template() {
    const { imgNum }: ImgButtonProps = this.$props;

    return `
    <div class="img-btn"></div>`;
  }

  mounted() {
    const { btnType, imgNum }: ImgButtonProps = this.$props;

    const $button = this.$target.querySelector('.img-btn');
    new ImgBox($button as Element, {
      imgType: 'medium',
    });
    if (btnType === 'add') {
      const $imgBox = this.$target.querySelector('.imgbox-medium');
      const count =
        '<div><span class="img-num">' + imgNum || 0 + '</span>/10</div>';
      new IconButton($imgBox as Element, {
        name: 'image',
      });
      const cnt = document.createElement('div');
      cnt.innerHTML = `<div><span class=${imgNum !== 0 ? 'img-num' : ''}>${
        imgNum || 0
      }</span>/10</div>`;
      $imgBox?.append(cnt);
    }
  }
}
