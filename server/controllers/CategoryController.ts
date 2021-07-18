// GET /main/categories (카테고리 목록)
// GET /main/locations (위치목록)

import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

const getCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.findCaregories();
    res.status(200).json({
      message: 'ok',
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const CategoryController = {
  getCategories,
};
