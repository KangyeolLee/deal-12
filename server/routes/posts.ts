//  * post
// POST  (글작성)
// INSERT INTO `post`('title', 'location_id', 'category_id', 'content', 'price', 'seller_id', 'state') VALUES ();
import express from 'express';
import { PostController } from '../controllers/PostController';

export const router = express.Router();

// 글작성
router.post('/', PostController.createPost);
// GET /location/{locationId}/category/{categoryId} (글목록)
// SELECT * FROM post limit 25 offset 1
router.get(
  '/location/:locationId/category/:categoryId',
  PostController.createPost
);
router.get('/:postId', PostController.getPostById);
router.put('/:postId', PostController.updatePost);
router.put('/:postId/state', PostController.updatePostState);
router.delete('/:postId', PostController.deletePost);
router.post('/:postId/like', PostController.creatPostLike);
router.delete('/:postId/like', PostController.deletePostLike);
