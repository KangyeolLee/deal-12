import Component from '../../core/Component';
import Header from '../Shared/Header';
import './styles.scss';
import CategoryResult from '../CategoryResult';

interface CategoryBtnProps {
  category: {
    id: number;
    name: string;
  };
  handleCategory: Function;
}

class CategoryBtn extends Component {
  template() {
    const { category }: CategoryBtnProps = this.$props;

    return `<div class="category-btn"><div class="box"></div><div class="name">${category.name}</div></div>`;
  }
  setEvent() {
    const { category, handleCategory } = this.$props;

    this.addEvent('click', '.category-btn', () => {
      handleCategory(category);
    });
  }
}

export default class Category extends Component {
  setup() {
    this.$state = {
      category: {
        id: null,
        name: null,
      },
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
      console.log(this.$state.categories, category);
      const $button = document.createElement('div');
      new CategoryBtn($button as Element, {
        category,
        handleCategory: (category: string) => {
          this.setState({ category: category });
          new CategoryResult($result as Element, {
            category: this.$state.category,
            locationId: this.$props.locationId,
          });
          (
            this.$target.querySelector('#category-result-modal') as HTMLElement
          ).className = 'modal-open';
        },
      });
      wrapper?.append($button);
    });

    const $result = this.$target.querySelector('#category-result-modal');
    // new CategoryResult($result as Element, {
    //   category: this.$state.category,
    //   locationId: this.$state.locationId,
    // });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
