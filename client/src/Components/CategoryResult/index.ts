import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../Shared/CategoryListItem';
import Header from '../Shared/Header';
import Loader from '../Shared/Loader';
import { setIntersectionObserver, token } from '../../lib/util';

export default class CategoryResult extends Component {
  setup() {
    this.$state = {
      items: [],
    };
    fetch(
      `/api/posts/location/${this.$props.locationId}/category/${this.$props.category.id}/0`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result, this.$props);
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
    const { locationId, category } = this.$props;
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: this.$props.category.name,
      headerType: 'menu-off-white',
    });

    const $itemList = this.$target.querySelector(
      '#result-item-list'
    ) as HTMLElement;
    if (this.$state.items.length > 0) {
      this.$state.items.forEach((item: CategoryListItemProps) => {
        const $item = document.createElement('div');
        $itemList?.append($item);
        new CategoryListItem($item, item);
      });
    } else {
      $itemList.className = 'no-data';
    }

    const isLogin = token() ? true : false;

    // infinite scrolling
    new Loader(this.$target.querySelector('.item-list') as HTMLLIElement);
    const $loader = this.$target.querySelector('.component-loader') as Element;
    const io = setIntersectionObserver({
      root: $itemList,
      isLogin,
      location_id: locationId,
      category_id: category.id,
    });
    io?.observe($loader);

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
