import '../../scss/categoryListItem';

interface ParamsType {
  text: string;
}

export default function CategoryListItem({ text }: ParamsType) {
  return `
    <div class="category-wrapper">
      <div class="category-list"></div>
      <h6 class="category-title">${text}</h6>
    </div>
  `;
}
