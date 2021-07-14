// import Component from '../../../core/Component';

// export default class InfoProduct extends Component {
//   template() {
//     return `
//             <div>InfoProduct</div>
//           `;
//   }
// }

import './styles';

interface PropsType {
  title: string;
  price: string;
  image: string;
}

export default function InfoProduct(props: PropsType) {
  const { title, price, image } = props;

  return `
    <div class="product-intro">
      <div class="image-wrapper">
        <img src="${image}" alt="상품 미리보기" />
      </div>
      <div class="product-intro__detail">
        <h6 class="title">${title}</h6>
        <p calss="price">${price}</p>
      </div>
    </div>
    <div class="button">판매중</div>
  `;
}
