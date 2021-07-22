import { Request, Response, NextFunction } from 'express';
import { PostService, PostType } from '../services/post/PostService';
import { PostInterestService } from '../services/post/PostInterestService';
import { LocationService } from '../services/LocationService';

const HOST = 'http://localhost:3000/';

const createPost = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, content, price, category_id, state } = req.body;
    const { id: seller_id, nickname } = req.user;
    const { loc1 } = await LocationService.findLocationsByUserNickname({
      nickname,
    });
    const location_id = loc1[0].id;
    const files = req.files as any;
    const post = {
      title,
      content,
      seller_id,
      location_id,
      price: +price,
      category_id: +category_id,
      state,
      thumbnail: HOST + files[0].path,
    };

    const result = await PostService.cratePost(post);
    const images = await PostService.createPostImage(result.insertId, files);
    return res.status(200).json({
      message: 'success create post!',
      postId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 로그인 유저 정보 필요 X
    const { locationId, categoryId, offset } = req.params;
    const result = await PostService.findPosts({
      location_id: +locationId,
      category_id: +categoryId,
      offset: +offset,
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
    const { title, content, price, category_id, thumbnail, willBeDeleted } =
      req.body;
    const { id: seller_id, nickname } = req.user;
    const { loc1 } = await LocationService.findLocationsByUserNickname({
      nickname,
    });
    const location_id = loc1[0].id;
    const files = req.files as any;
    const updates = {
      title,
      content,
      seller_id,
      location_id,
      price: +price,
      category_id: +category_id,
      thumbnail: thumbnail ? thumbnail : HOST + files[0].path,
      willBeDeleted,
    };

    const deleted = await PostService.deletePostImages({
      post_id: +postId,
      urls: willBeDeleted,
    });
    const result = await PostService.updatePost({
      post_id: +postId,
      ...updates,
    });
    if (files.length) await PostService.createPostImage(+postId, files);

    return res.status(200).json({
      message: 'ok',
      result,
      deleted,
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
