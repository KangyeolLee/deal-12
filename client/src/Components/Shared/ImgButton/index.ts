import Component from '../../../core/Component';
import IconButton from '../IconButton';
import ImgBox from '../ImgBox';
import './styles.scss';

type ButtonType = 'add' | 'delete';
interface ImgButtonProps {
  btnType: ButtonType;
  img?: string;
  imgNum?: number;
  addImg?: EventHandlerNonNull;
}

export default class ImgButton extends Component {
  template() {
    return `
    <div class="img-btn"></div>`;
  }

  mounted() {
    const { btnType, imgNum, addImg, img }: ImgButtonProps = this.$props;

    const $button = this.$target.querySelector('.img-btn');
    new ImgBox($button as Element, {
      imgType: 'medium',
      img: img,
    });
    const $imgBox = this.$target.querySelector('.imgbox-medium');

    if (btnType === 'add') {
      // 사진 추가
      const $fileInput = document.createElement('input');
      $fileInput.type = 'file';
      $fileInput.accept = 'image/*';
      $fileInput.name = 'image';
      $fileInput.className = 'file-input';
      $fileInput.multiple = true;
      $fileInput.onchange = addImg as
        | ((this: GlobalEventHandlers, ev: Event) => any)
        | null;
      $button?.append($fileInput);

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
