import { Request, Response, NextFunction } from 'express';
import { PostService, PostType } from '../services/PostService';
import { PostInterestService } from '../services/post/PostInterestService';

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  // 더미데이터 - 실제 프론트에서 받아오는 구조로 재설계 필요
  const post: PostType = {
    title: '테스트',
    content: '테스트내용',
    location_id: 1,
    category_id: 2,
    view_count: 3,
    price: 5000,
    seller_id: 1,
    state: '판매중',
    thumbnail: 'test.url',
    interest_count: 5,
  };

  try {
    await PostService.cratePost(post);
    return res.status(200).json({
      message: 'success create post!',
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 로그인 유저 정보 필요 X
    const { locationId, categoryId } = req.params;
    const result = await PostService.findPosts({
      location_id: +locationId,
      category_id: +categoryId,
    });
    return res.status(200).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};

const getPostBySellerNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const result = await PostService.findPostBySellerNickname({
      nickname: user.nickname,
    });
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

// 관심목록
const getPostInterestsByUserNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const result = await PostInterestService.findPostInterestsByUserId({
      user_id: user.id,
    });
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const result = await PostService.deletePost({ post_id: +postId });

    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const checkPostBelongToMe = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { user } = req;
    const isMine = await PostService.checkMyPost({
      post_id: +postId,
      user_id: user.id,
    });
    return res.status(200).json({
      isMine,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const result = await PostService.findPostById({ post_id: +postId });
    await PostService.updatePostViewCount({ post_id: +postId });

    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    // 더미데이터 -> 실제 프론트에서 데이터 받아오는 구조로 수정 필요
    const updates = {
      title: '수정된 제목입니다..',
      price: 999999,
      location_id: 1,
      category_id: 1,
      content: '수정된 내용입니다.',
      state: '수정된 상태',
      thumbnail: 'updated.url',
    };
    const result = await PostService.updatePost({
      post_id: +postId,
      ...updates,
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePostState = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { state } = req.body;
    const result = await PostService.updatePostState({
      post_id: +postId,
      state,
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

// 좋아요 눌렀는지
const checkPostInterestByUserId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { postId } = req.params;

    const user =
      await PostInterestService.findPostAlreadyInterestedByUserAndPostId({
        post_id: +postId,
        user_id: id,
      });

    if (!user.length) {
      return res.status(200).json({
        result: false,
      });
    }

    return res.status(200).json({
      result: true,
    });
  } catch (error) {
    next(error);
  }
};

const creatPostInterest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { id: user_id } = req.user;

    await PostInterestService.createPostInterest({
      post_id: +postId,
      user_id,
    });
    await PostInterestService.updatePostInterestCount({ post_id: +postId });

    return res.status(200).json({
      message: 'success create like',
    });
  } catch (error) {
    next(error);
  }
};

const deletePostInterest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { id: user_id } = req.user;

    await PostInterestService.deletePostInterest({
      post_id: +postId,
      user_id,
    });

    return res.status(200).json({
      message: 'success delete like',
    });
  } catch (error) {
    next(error);
  }
};

export const PostController = {
  createPost,
  getPosts,
  getPostBySellerNickname,
  deletePost,
  getPostById,
  updatePost,
  updatePostState,
  checkPostInterestByUserId,
  creatPostInterest,
  deletePostInterest,
  getPostInterestsByUserNickname,
  checkPostBelongToMe,
};
