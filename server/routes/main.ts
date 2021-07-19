import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { LocationController } from '../controllers/LocationController';

const mainRouter = express.Router();

// @ GET 요청
// 모든 카테고리 목록
mainRouter.get('/categories', CategoryController.getCategories);
// 모든 위치 목록
mainRouter.get('/locations', LocationController.getLocations);

export default mainRouter;
