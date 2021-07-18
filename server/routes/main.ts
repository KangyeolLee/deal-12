import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { LocationController } from '../controllers/LocationController';

const mainRouter = express.Router();

// * main
// GET /main/categories (카테고리 목록)
// SELECT * FROM category

// GET /main/locations (위치목록)
// SELECT * FROM location

mainRouter.get('/categories', CategoryController.getCategories);
mainRouter.get('/locations', LocationController.getLocations);

export default mainRouter;
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
