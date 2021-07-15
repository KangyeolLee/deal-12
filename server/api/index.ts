import express from 'express';

const router = express.Router();

router.get('/', async (req: any, res: any, next: any) => {
  try {
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;

/**

 * auth
POST /auth/login
POST /auth/register
GET /auth/logout

 * post
POST /posts (글작성)
GET /posts/location/{locationId}/category/{categoryId} (글목록)
GET /posts/{postId} (상세글)
PUT /posts/{postId} (글수정)
PUT /posts/{postId}/state (글상태 수정)
DELETE /posts/{postId} (글삭제)
POST /posts/{postId}/like (좋아요)
DELETE /posts/{postId}/like (좋아요 해제)

 * user
GET /users/me/like/posts (내가 좋아요한 글들)
GET /users/me/posts (내가 쓴 글들)
GET /users/me/locations (내 동네 가져오기)
PUT /users/me/locations (내 동네 수정하기)

 * main
GET /main/categories (카테고리 목록)
GET /main/locations (위치목록)

 * 
 */
// GET /users/me/posts/{postId}/chatrooms
// GET /users/me/chatrooms (내 전체채팅)
// GET /users/me/chatrooms/{chatroomId}/chats (현재채팅방의 채팅목록)
// GET /chatrooms/{chatroomId}/chats
// /chatroom /chatrooms /chats/:chatroodId
