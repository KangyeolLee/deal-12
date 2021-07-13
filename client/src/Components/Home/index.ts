// import { $router } from '../lib/router.js';

import Component from '../../core/Component';
import CategoryListItem, {
  CategoryListItemProps,
} from '../shared/CategoryListItem';
import Header from '../shared/Header';
import './styles.scss';

const list: CategoryListItemProps[] = [];
[0, 0, 0, 0, 0, 0, 0, 0, 0].forEach(() => {
  list.push({
    title: 'Title',
    img: 'asdf',
    price: 12345,
    location: '역삼동',
    timestamp: '3시간 전',
    isLiked: true,
    commentNum: 1,
    likeNum: 1,
  });
});

export default class Home extends Component {
  template() {
    return `
    <header></header>
    <div id="item-list" />
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    console.log($header);
    new Header($header as Element, {
      title: '역삼동',
      headerType: 'main',
    });

    const $itemList = this.$target.querySelector('#item-list');
    list.forEach((item) => {
      const $item = document.createElement('div');
      $itemList?.append($item);
      new CategoryListItem($item as Element, item);
    });
  }
}
