import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';

const list: CategoryListItemProps[] = [];
[0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(() => {
  list.push({
    title: '우아한 옷 팔아요',
    img: 'https://flexible.img.hani.co.kr/flexible/normal/700/1040/imgdb/original/2021/0428/20210428504000.jpg',
    price: 69000,
    location: '역삼동',
    timestamp: '3시간 전',
    chatNum: 1,
    likeNum: 1,
    pageName: 'home',
  });
});

export default class CategoryResult extends Component {
  template() {
    return `
    <header></header>
    <div class="item-list" id="result-item-list"></div>
    `;
  }
  mounted() {
    const { category }: { category: string } = this.$props;

    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: category,
      headerType: 'menu-off-white',
    });

    const $itemList = this.$target.querySelector('#result-item-list');
    list.forEach((item) => {
      const $item = document.createElement('div');
      $itemList?.append($item);
      new CategoryListItem($item as Element, item);
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
