//  * post
// POST  (글작성)
// INSERT INTO `post`('title', 'location_id', 'category_id', 'content', 'price', 'seller_id', 'state') VALUES ();
import express from 'express';
import { PostController } from '../controllers/PostController';

const postsRouter = express.Router();

// 글작성
postsRouter.post('/', PostController.createPost);
// GET /location/{locationId}/category/{categoryId} (글목록)
// SELECT * FROM post limit 25 offset 1
postsRouter.get(
  '/location/:locationId/category/:categoryId',
  PostController.getPosts
);
postsRouter.get('/:postId', PostController.getPostById);
postsRouter.put('/:postId', PostController.updatePost);
postsRouter.put('/:postId/state', PostController.updatePostState);
postsRouter.delete('/:postId', PostController.deletePost);
postsRouter.post('/:postId/like', PostController.creatPostLike);
postsRouter.get('/:postId/like', PostController.getPostLikesByUserId);
postsRouter.delete('/:postId/like', PostController.deletePostLike);

export default postsRouter;
