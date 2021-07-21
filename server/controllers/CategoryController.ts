// GET /main/categories (카테고리 목록)
// GET /main/locations (위치목록)

import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await CategoryService.findCaregories();
    return res.status(200).json({
      message: 'ok',
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  getCategories,
};
