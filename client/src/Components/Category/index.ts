import Component from '../../core/Component';
import Header from '../Shared/Header';
import './styles.scss';
import CategoryResult from '../CategoryResult';
import ImgBox from '../../Components/Shared/ImgBox';

interface CategoryBtnProps {
  category: {
    id: number;
    name: string;
  };
  img: string;
  handleCategory: Function;
}

const images = [
  'https://pbs.twimg.com/profile_images/1263155652412665862/L0zGXYbP_400x400.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGJ2xUvKZxThYw-7ssfsqvxmWX9YY95ZlDtWpTh18CygdfXX2lM_h_oSJhYUa3I4dvWCM&usqp=CAU',
  'https://s.alicdn.com/@sc04/kf/H753e9a41207d4f2c80b3dcbe331028d9H.jpg_300x300.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFKjwpVmBYuMx5wPZzDQEd7OVhYS7iD5vsOvNLLOOJJaaHRbmLBSDd7U7q8OUsIArbqVA&usqp=CAU',
  'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MTFfOTgg/MDAxNTAyNDMyMjYyOTE2.nJcQeGlURFlsekeGPat-w6wJaPQZeJscFhGuw4MQoGAg.BOx6Q9Wnjq2WgBAWy47mi-5LuACP3j3ZgdCcO9Wi77kg.JPEG.goodchoice0221/KakaoTalk_20170614_183421309.jpg?type=w800',
  'https://t1.daumcdn.net/cfile/tistory/99DBCD4E5A82385D1B',
  'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile4.uf.tistory.com%2Fimage%2F9933BE3B5DD3E0C825F14E',
  'https://img1.daumcdn.net/thumb/R720x0/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fshare%2F52e7c6e829dc4022afef4ad9b60a6fcd.png',
  'https://mblogthumb-phinf.pstatic.net/MjAyMDA4MjhfMjAw/MDAxNTk4NjIyNzAzMTY2.4OMKwJR76tS20oeIwYTKWt18EeLhUkRzN0GG_cD8Mdgg.DuP-r3tHSyMPjZjlDdOItSVa9jhMj0KSh4vBPfzHg0sg.JPEG.chance_pol/1598622702162.jpg?type=w800',
  'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDZfMjcz/MDAxNDkxNDI5MDQ1OTE2.agx3z-CxdgHSDklRZauhMHQM1ZKHYdqA6UfdTk2u5e8g.4jVbwOUC1Xk9krp9nEPKG9EJagBnAWuq8VJLDlGAHxYg.PNG.cheesa91_/KakaoTalk_Photo_2017-04-06-06-50-35_86.png?type=w800',
  'https://story.holapet.com/wp-content/uploads/2020/03/xxxxxxxxxxxxxxxxxxxxxxxx-768x1024.jpg',
  'https://img.huffingtonpost.com/asset/5d707d66240000ba02758605.jpeg?ops=scalefit_630_noupscale',
  'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0TbCL%2FbtqAgF9VEiK%2F3iKP014YusE4BB7GmgjS50%2Fimg.jpg',
  'https://img.khan.co.kr/news/2020/10/02/l_2020092801003372100269742.jpg',
];

class CategoryBtn extends Component {
  template() {
    const { category }: CategoryBtnProps = this.$props;

    return `<div class="category-btn"><div class="box"></div><div class="name">${category.name}</div></div>`;
  }
  setEvent() {
    const { category, handleCategory, img } = this.$props;

    const $box = this.$target.querySelector('.box');
    new ImgBox($box as Element, {
      imgType: 'medium',
      img,
    });

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
    this.$state.categories.forEach((category: any, idx: number) => {
      const $button = document.createElement('div');
      new CategoryBtn($button as Element, {
        category,
        img: images[idx],
        handleCategory: (category: string) => {
          this.setState({ category: category });
          const $result = this.$target.querySelector('#category-result-modal');
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

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
