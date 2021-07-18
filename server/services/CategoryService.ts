import { execQuery } from '../database/database';
import { GET_CATEGORIES } from './../quries/category';

export const CategoryService = {
  findCaregories: async () => {
    const data = await execQuery(GET_CATEGORIES);
    return data;
  },
};
