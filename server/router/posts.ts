//  * post
// POST  (글작성)
// INSERT INTO `post`('title', 'location_id', 'category_id', 'content', 'price', 'seller_id', 'state') VALUES ();
import express from 'express';
import { PostController } from '../controller/PostController';

export const router = express.Router();

// 글작성
router.post('/', async (req: any, res: any, next: any) => {
  try {
    PostController.createPost(req.body);
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// GET /location/{locationId}/category/{categoryId} (글목록)
// SELECT * FROM post limit 25 offset 1
router.get(
  '/location/:locationId/category/:categoryId',
  async (req: any, res: any, next: any) => {
    try {
      PostController.createPost(req.body);
      return res.status(200).json({
        message: 'OK',
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
);

router.get('/:postId', async (req: any, res: any, next: any) => {
  try {
    PostController.getPostById();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put('/:postId', async (req: any, res: any, next: any) => {
  try {
    PostController.updatePost();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put('/:postId/state', async (req: any, res: any, next: any) => {
  try {
    PostController.updatePostState();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete('/:postId', async (req: any, res: any, next: any) => {
  try {
    PostController.deletePost();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/:postId/like', async (req: any, res: any, next: any) => {
  try {
    PostController.creatPostLike();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete('/:postId/like', async (req: any, res: any, next: any) => {
  try {
    PostController.deletePostLike();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
