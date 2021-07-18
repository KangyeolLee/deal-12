// GET /main/categories (카테고리 목록)
// GET /main/locations (위치목록)

import { CategoryService } from '../service/CategoryService';

const getCategories = () => {
  CategoryService.findCaregories();
};

export const CategoryController = {
  getCategories,
};
