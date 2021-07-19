import Component from '../../core/Component';
import Header from '../Shared/Header';
import './styles.scss';
import CategoryResult from '../CategoryResult';

interface CategoryBtnProps {
  id: number;
  name: string;
  handleCategory: Function;
}

class CategoryBtn extends Component {
  template() {
    const { name }: CategoryBtnProps = this.$props;

    return `<div class="category-btn"><div class="box"></div><div class="name">${name}</div></div>`;
  }
  setEvent() {
    const { name, handleCategory } = this.$props;

    this.addEvent('click', '.category-btn', () => {
      handleCategory(name);
    });
  }
}

export default class Category extends Component {
  setup() {
    this.$state = {
      categories: [],
    };
    fetch('/api/main/categories', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then(({ result }) => {
        this.setState({ categories: result });
      });
  }
  template() {
    return `
    <header></header>
    <div class="category-wrapper"></div>
    <div id="category-result-modal" class="modal-close"></div>
    `;
  }
  mounted() {
    const $header = this.$target.querySelector('header');
    new Header($header as Element, {
      title: '카테고리',
      headerType: 'menu-off-white',
    });

    const wrapper = this.$target.querySelector('.category-wrapper');
    this.$state.categories.forEach((category: any) => {
      const $button = document.createElement('div');
      new CategoryBtn($button as Element, {
        id: category.id,
        name: category.name,
        handleCategory: (category: string) => {
          this.setState({ category: category });
          (
            this.$target.querySelector('#category-result-modal') as HTMLElement
          ).className = 'modal-open';
        },
      });
      wrapper?.append($button);
    });

    const $result = this.$target.querySelector('#category-result-modal');
    new CategoryResult($result as Element, {
      category: this.$state.category,
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
