import express from 'express';
import { PostController } from '../controllers/PostController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const postsRouter = express.Router();

// @ GET 요청
// 위치번호(0일 시 모든 위치)와 카테고리 번호(0일시 모든 카테고리)에 해당하는 모든 포스트 목록 조회
postsRouter.get(
  '/location/:locationId/category/:categoryId',
  PostController.getPosts
);

// 포스트번호에 해당하는 포스트 디테일 조회
postsRouter.get('/:postId', PostController.getPostById);
// 포스트번호에 해당하는 포스트가 내가 작성한 포스트인지 확인
postsRouter.get(
  '/:postId/check',
  authenticateAccessToken,
  PostController.checkPostBelongToMe
);

// @ POST 요청
// 제출된 데이터에 맞는 포스트를 생성
postsRouter.post('/', authenticateAccessToken, PostController.createPost);

// @ PUT 요청
// 포스트번호에 맞는 포스트의 내용을 수정
postsRouter.put('/:postId', authenticateAccessToken, PostController.updatePost);

// 포스트 번호에 해당하는 포스트 상태만 수정
postsRouter.put(
  '/:postId/state',
  authenticateAccessToken,
  PostController.updatePostState
);

// @ DELETE 요청
// 포스트번호에 해당하는 포스트를 삭제
postsRouter.delete(
  '/:postId',
  authenticateAccessToken,
  PostController.deletePost
);

// 포스트번호에 해당하는 포스트에 로그인 된 유저의 관심 생성
postsRouter.post(
  '/:postId/interest',
  authenticateAccessToken,
  PostController.creatPostInterest
);

// 포스트번호에 해당하는 관심내용 삭제
postsRouter.delete(
  '/:postId/interest',
  authenticateAccessToken,
  PostController.deletePostInterest
);

// 유저가 작성한 글인지 확인
postsRouter.get(
  '/:postId/check',
  authenticateAccessToken,
  PostController.checkPostInterestByUserId
);

// 유저의 관심글인지 확인
postsRouter.get(
  '/:postId/interest/check',
  authenticateAccessToken,
  PostController.checkPostInterestByUserId
);

export default postsRouter;

//  * post
// POST  (글작성)
// INSERT INTO `post`('title', 'location_id', 'category_id', 'content', 'price', 'seller_id', 'state') VALUES ();
// GET /location/{locationId}/category/{categoryId} (글목록)
// SELECT * FROM post limit 25 offset 1
