import '../../scss/productListItem';

interface ParamsType {
  title: string;
  price: string;
}

export default function ProductListItem({ title, price }: ParamsType) {
  return `
    <div class="product-wrapper">
      <div class="product-img"></div>
      <div class="product-desc">
        <h1>${title}</h1>
        <p>location · timestamp</p>
        <p>${price}</p>
      </div>
    </div>
  `;
}
