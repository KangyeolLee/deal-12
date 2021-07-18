import express from 'express';
import { CategoryController } from '../controller/CategoryController';
import { LocationController } from '../controller/LocationController';

export const router = express.Router();

// * main
// GET /main/categories (카테고리 목록)
// SELECT * FROM category

// GET /main/locations (위치목록)
// SELECT * FROM location

router.get('/categories', async (req: any, res: any, next: any) => {
  try {
    CategoryController.getCategories();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/locations', async (req: any, res: any, next: any) => {
  try {
    LocationController.getLocations;
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**




INSERT INTO category('name') VALUES ('전체')
INSERT INTO category('name') VALUES ('의류')
INSERT INTO category('name') VALUES ('ㅁㄴㅇㄹ')

INSERT INTO location('name') VALUES ('강남')





 * 
 */
// GET /users/me/posts/{postId}/chatrooms
// GET /users/me/chatrooms (내 전체채팅)
// GET /users/me/chatrooms/{chatroomId}/chats (현재채팅방의 채팅목록)
// GET /chatrooms/{chatroomId}/chats
// /chatroom /chatrooms /chats/:chatroodId
