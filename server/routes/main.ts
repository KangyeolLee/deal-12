import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { LocationController } from '../controllers/LocationController';

export const router = express.Router();

// * main
// GET /main/categories (카테고리 목록)
// SELECT * FROM category

// GET /main/locations (위치목록)
// SELECT * FROM location

router.get('/categories', CategoryController.getCategories);
router.get('/locations', LocationController.getLocations);

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
