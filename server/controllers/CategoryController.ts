// GET /main/categories (카테고리 목록)
// GET /main/locations (위치목록)

import { CategoryService } from '../services/CategoryService';

const getCategories = (req: any, res: any) => {
  try {
    CategoryService.findCaregories();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const CategoryController = {
  getCategories,
};
