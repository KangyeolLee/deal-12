import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';

const list: CategoryListItemProps[] = [];
[0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(() => {
  list.push({
    title: '빈티지 롤러 스케이트',
    img: 'https://user-images.githubusercontent.com/48883344/125383566-8c373e00-e3d2-11eb-82c3-565a0f5da5f6.png',
    price: 12345,
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
