import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';

export default class CategoryResult extends Component {
  setup() {
    this.$state = {
      items: [],
    };
    fetch(
      `/api/posts/location/${this.$props.locationId}/category/${this.$props.category.id}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ items: result });
      });
  }
  template() {
    return `
    <header></header>
    <div class="item-list" id="result-item-list"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: this.$props.category.name,
      headerType: 'menu-off-white',
    });

    const $itemList = this.$target.querySelector(
      '#result-item-list'
    ) as Element;
    if (this.$state.items.length > 0) {
      this.$state.items.forEach((item: CategoryListItemProps) => {
        const $item = document.createElement('div');
        $itemList?.append($item);
        new CategoryListItem($item, item);
      });
    } else {
      $itemList.innerHTML = '해당 카테고리에 대한 상품이 없습니다.';
      $itemList.className = 'no-data';
    }

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
