import { NextFunction, Request, Response } from 'express';
import { PostService, PostType } from '../services/post/PostService';
import { PostInterestService } from '../services/post/PostInterestService';
import { UserType } from '../services/UserService';

const createPost = (req: Request, res: Response) => {
  const post = req.body;
  try {
    PostService.cratePost(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const getPosts = (req: Request, res: Response) => {
  try {
    PostService.findPosts();
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
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

const getPostById = () => {
  PostService.findPostById;
  PostService.updatePostViewCount();
};

const updatePost = () => {
  PostService.updatePost();
};

const updatePostState = () => {
  PostService.updatePostState();
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
