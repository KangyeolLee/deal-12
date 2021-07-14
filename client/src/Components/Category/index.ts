import { $router } from '../../lib/router';
import Component from '../../core/Component';
import Header from '../Shared/Header';
import './styles.scss';

const categories = [
  { id: 1, name: '디지털기기' },
  { id: 2, name: '디지털기기' },
  { id: 3, name: '디지털기기' },
  { id: 4, name: '디지털기기' },
  { id: 5, name: '디지털기기' },
  { id: 6, name: '디지털기기' },
  { id: 7, name: '디지털기기' },
  { id: 8, name: '디지털기기' },
  { id: 9, name: '디지털기기' },
  { id: 10, name: '디지털기기' },
  { id: 11, name: '디지털기기' },
  { id: 12, name: '디지털기기' },
  { id: 13, name: '디지털기기' },
  { id: 14, name: '디지털기기' },
];

interface CategoryBtnProps {
  id: number;
  name: string;
}

class CategoryBtn extends Component {
  template() {
    const { id, name }: CategoryBtnProps = this.$props;

    return `<div class="category-btn"><div class="box"></div><div class="name">${name}</div></div>`;
  }
  setEvent() {
    this.addEvent('click', 'button', () => {
      $router.push('/home');
    });
  }
}

export default class Category extends Component {
  template() {
    return `
    <header></header>
    <div class="category-wrapper"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '카테고리',
      headerType: 'menu-off-white',
    });

    const wrapper = this.$target.querySelector('.category-wrapper');
    categories.forEach((category) => {
      const $button = document.createElement('div');
      new CategoryBtn($button as Element, {
        id: category.id,
        name: category.name,
      });
      wrapper?.append($button);
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      console.log('asdf');
      this.$target.className = 'modal-close';
    });
  }
}
