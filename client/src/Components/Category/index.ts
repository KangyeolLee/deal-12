import Component from '../../core/Component';
import Header from '../Shared/Header';
import './styles.scss';
import CategoryResult from '../CategoryResult';

const categories = [
  { id: 1, name: '디지털기기' },
  { id: 2, name: '생활/가전' },
  { id: 3, name: '가구/인테리어' },
  { id: 4, name: '게임/취미' },
  { id: 5, name: '생활/가공식품' },
  { id: 6, name: '스포츠/레저' },
  { id: 7, name: '여성패션/잡화' },
  { id: 8, name: '남성패션/잡화' },
  { id: 9, name: '유아동' },
  { id: 10, name: '뷰티/미용' },
  { id: 11, name: '반려동물' },
  { id: 12, name: '도서/티켓/음반' },
  { id: 13, name: '식물' },
  { id: 14, name: '기타 중고물품' },
];

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
      category: '전체',
    };
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
    categories.forEach((category) => {
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
