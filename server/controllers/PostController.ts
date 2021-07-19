import { Request, Response, NextFunction } from 'express';
import { PostService, PostType } from '../services/post/PostService';
import { PostInterestService } from '../services/post/PostInterestService';

const createPost = (req: Request, res: Response) => {
  const post = req.body;
  try {
    PostService.cratePost(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { locationId, categoryId } = req.params;
    const result = await PostService.findPosts({
      location_id: +locationId,
      category_id: +categoryId,
    });
    res.status(200).json({
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
    const result = await PostService.findPostBySellerNickname({
      nickname: req.user.id,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const getPostInterestsByUserNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PostInterestService.findPostInterestsByUserNickname({
      nickname: req.user.id,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const deletePost = () => {
  try {
    PostService.deletePost();
  } catch (error) {}
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const result = await PostService.findPostById(+postId);
    await PostService.updatePostViewCount(+postId);
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = () => {
  // PostService.updatePost();
};

const updatePostState = () => {
  PostService.updatePostState();
};

const creatPostLike = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const user_id = req.user.id || 1; // user_id 받아와야 함미다
    // const result = await PostInterestService.createPostLikeService({post_id: +postId, user_id});
    // console.log(result);
    res.status(200).json({
      message: 'success create like',
    });
  } catch (error) {
    next(error);
  }
};

const deletePostLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const getPostLikesByUserId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const user_id = 1;
    // const result = await PostInterestService.findPostLikesByUserIdService({ post_id: +postId, user_id });
    res.status(200).json({
      // result,
    });
  } catch (error) {
    next(error);
  }
};
const creatPostInterest = () => {
  PostInterestService.createPostInterest();
};

const deletePostInterest = () => {
  PostInterestService.deletePostInterest();
};

export const PostController = {
  createPost,
  getPosts,
  getPostBySellerNickname,
  deletePost,
  getPostById,
  updatePost,
  updatePostState,
  creatPostInterest,
  deletePostInterest,
  getPostInterestsByUserNickname,
};
