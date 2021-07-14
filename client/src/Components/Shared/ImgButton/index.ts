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
    const $imgBox = this.$target.querySelector('.imgbox-medium');

    if (btnType === 'add') {
      new IconButton($imgBox as Element, {
        name: 'image',
      });
      const cnt = document.createElement('div');
      cnt.innerHTML = `<div><span class=${imgNum !== 0 ? 'img-num' : ''}>${
        imgNum || 0
      }</span>/10</div>`;
      $imgBox?.append(cnt);
    } else {
      const $delBtn = document.createElement('div');
      $delBtn.className = 'del-btn';
      new IconButton($delBtn as Element, {
        name: 'close-white',
      });
      $button?.append($delBtn);
    }
  }
}
