// GET /users/me/posts (내가 쓴 글들)
// SELECT * FROM post WHERE user_id={userId}

// GET /users/me/locations (내 동네 가져오기)
// SELECT * FROM user WHERE user_id={userId}

// PUT /users/me/locations (내 동네 수정하기)
// UPDATE post SET location1_id={asdf} WHERE user_id={}
// UPDATE post SET location2_id={asdf} WHERE user_id={}

import express from 'express';
import { LocationController } from '../controller/LocationController';
import { PostController } from '../controller/PostController';
import { UserController } from '../controller/UserController';

export const router = express.Router();

router.get('/me/like/posts', async (req: any, res: any, next: any) => {
  try {
    PostController.getPostByUserId(req.body);
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/me/locations', async (req: any, res: any, next: any) => {
  try {
    LocationController.getLocationsByUserId();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put('/me/locations', async (req: any, res: any, next: any) => {
  try {
    UserController.updateUser(req.body);
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
