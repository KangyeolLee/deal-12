// GET /users/me/posts (내가 쓴 글들)
// SELECT * FROM post WHERE user_id={userId}

// GET /users/me/locations (내 동네 가져오기)
// SELECT * FROM user WHERE user_id={userId}

// PUT /users/me/locations (내 동네 수정하기)
// UPDATE post SET location1_id={asdf} WHERE user_id={}
// UPDATE post SET location2_id={asdf} WHERE user_id={}

import express from 'express';
import { LocationController } from '../controllers/LocationController';
import { PostController } from '../controllers/PostController';
import { UserController } from '../controllers/UserController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const usersRouter = express.Router();

usersRouter.get('/', authenticateAccessToken, UserController.getUserByNickname);

// @ GET 요청
// 로그인 한 유저의 관심 포스트 목록
usersRouter.get(
  '/like/posts',
  authenticateAccessToken,
  PostController.getPostInterestsByUserNickname
);
// 로그인 한 유저가 작성한 포스트 목록
usersRouter.get(
  '/posts',
  authenticateAccessToken,
  PostController.getPostBySellerNickname
);
// 로그인 한 유저의 위치 목록
usersRouter.get(
  '/locations',
  authenticateAccessToken,
  LocationController.getLocationsByUserNickname
);

// @ PUT 요청
// 로그인 한 유저의 위치 정보 수정
usersRouter.put(
  '/locations',
  authenticateAccessToken,
  UserController.updateUser
);

export default usersRouter;
