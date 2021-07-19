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

usersRouter.get(
  '/me/like/posts',
  authenticateAccessToken,
  PostController.getPostInterestsByUserId
);
usersRouter.get('/me/locations', LocationController.getLocationsByUserId);
usersRouter.put('/me/locations', UserController.updateUser);

export default usersRouter;
