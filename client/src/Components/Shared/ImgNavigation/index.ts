import './styles';
import Component from './../../../core/Component';
import ImgBox from './../ImgBox/index';
import NavItem from './NavItem';

interface SliderTypes {
  $navigation: HTMLElement;
}

export default class ImgNavigation extends Component {
  private threshold = 30;
  private posInitial = 0;
  private posFinal = 0;
  private posX1 = 0;
  private posX2 = 0;
  private index = 0;
  private allowMove = true;
  private itemsLength!: number;

  template() {
    return `
      <div class="slider-viewport">
        <div class="image-navigation"></div>
        <div class="image-nav"></div>
      </div>
    `;
  }

  mounted() {
    const { images } = this.$props;
    const $navigation = this.$target.querySelector(
      '.image-navigation'
    ) as HTMLElement;
    const $imageNav = this.$target.querySelector('.image-nav');

    $navigation.style.width = 100 * (images?.length + 2) + '%';

    images?.forEach((image: string, index: number) => {
      const $div = document.createElement('div');
      $div.classList.add('navigation-item', `image-target-${index}`);
      new ImgBox($div as HTMLDivElement, {
        imgType: 'gradient',
        img: image,
      });
      $navigation?.append($div);
    });

    new NavItem($imageNav as HTMLElement, images);

    this.initSlider({ $navigation });
  }

  private initSlider({ $navigation }: SliderTypes) {
    const navigationItems = $navigation.querySelectorAll('.navigation-item');
    this.itemsLength = navigationItems.length;

    const itemSize = (<HTMLElement>$navigation.parentElement).offsetWidth;
    const firstItem = navigationItems[0];
    const lastItem = navigationItems[this.itemsLength - 1];
    const cloneFirstItem = firstItem?.cloneNode(true);
    const cloneLastItem = lastItem?.cloneNode(true);
    const $ImgNav = this.$target.querySelectorAll('.image-nav .nav-item');
    const $ImgNavigator = this.$target.querySelector('.image-nav');

    $navigation.style.left = -itemSize + 'px';
    $navigation.append(cloneFirstItem);
    $navigation.prepend(cloneLastItem);

    $navigation.addEventListener('mousedown', (e) =>
      this.dragStart(e as DragEvent, $navigation)
    );

    $navigation.addEventListener('transitionend', () =>
      this.checkIndex($ImgNav as NodeListOf<HTMLElement>, $navigation)
    );

    $ImgNavigator?.addEventListener('click', (e) => {
      const target = e.target as HTMLLIElement;
      const regex = /[\d]{1,}/;

      if (!target.className.includes('nav-item')) {
        return;
      }

      const targetIdx = target.className.match(regex)?.[0];
      this.moveByClickImgNav($navigation, +targetIdx!);
      this.activateImgNav($ImgNav as NodeListOf<HTMLElement>);
    });
  }

  private dragStart(e: DragEvent, $navigation: HTMLElement) {
    e.preventDefault();
    this.posInitial = $navigation.offsetLeft;

    this.posX1 = e.clientX;
    document.onmouseup = () => this.dragEnd($navigation);
    document.onmousemove = (e) => this.dragAction(e, $navigation);
  }

  private dragAction(e: Event, $navigation: HTMLElement) {
    const event = e as DragEvent;

    this.posX2 = this.posX1 - event.clientX;
    this.posX1 = event.clientX;
    $navigation.style.left = $navigation.offsetLeft - this.posX2 + 'px';
  }

  private dragEnd($navigation: HTMLElement) {
    this.posFinal = $navigation.offsetLeft;

    if (this.posFinal - this.posInitial < -this.threshold) {
      this.preventSliding('LEFT', $navigation);
    } else if (this.posFinal - this.posInitial > this.threshold) {
      this.preventSliding('RIGHT', $navigation);
    } else {
      $navigation.style.left = this.posInitial + 'px';
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  private activateImgNav($ImgNav: NodeListOf<HTMLElement>) {
    $ImgNav.forEach((item: HTMLElement) => {
      const targetIdx = this.index + '';

      item.classList.remove('on');
      if (item.className.includes(targetIdx)) {
        item.classList.add('on');
      }
    });
  }

  private moveByClickImgNav($navigation: HTMLElement, index: number) {
    const itemSize = $navigation.parentElement!.offsetWidth;
    this.index = index;

    $navigation.classList.add('working');
    $navigation.style.left = -(itemSize * (index + 1)) + 'px';
  }

  private checkIndex(
    $ImgNav: NodeListOf<HTMLElement>,
    $navigation: HTMLElement
  ) {
    $navigation.classList.remove('working');

    const itemSize = $navigation.parentElement!.offsetWidth;

    if (this.index === -1) {
      $navigation.style.left = -(this.itemsLength * itemSize) + 'px';
      this.index = this.itemsLength - 1;
    }

    if (this.index === this.itemsLength) {
      $navigation.style.left = -itemSize + 'px';
      this.index = 0;
    }

    this.activateImgNav($ImgNav);
    this.allowMove = true;
  }

  private preventSliding(direction: string, $navigation: HTMLElement) {
    $navigation.classList.add('working');

    const itemSize = $navigation.parentElement!.offsetWidth;

    if (this.allowMove) {
      if (direction === 'LEFT') {
        $navigation.style.left = this.posInitial - itemSize + 'px';
        this.index++;
      } else if (direction === 'RIGHT') {
        $navigation.style.left = this.posInitial + itemSize + 'px';
        this.index--;
      }
    }

    this.allowMove = false;
  }
}
