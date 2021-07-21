import { Request, Response, NextFunction } from 'express';
import { PostService, PostType } from '../services/post/PostService';
import { PostInterestService } from '../services/post/PostInterestService';

const HOST = 'http://localhost:3000/';

const createPost = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, content, price, category_id, state } = req.body;
    const { id: seller_id, location1_id: location_id } = req.user;
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
    res.status(200).json({
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
    // 로그인 된 유저 정보 필요
    const { user } = req;
    const result = await PostService.findPostBySellerNickname({
      nickname: user.nickname,
    });
    res.status(200).json({ result });
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
    // 로그인 된 유저 정보 필요
    const { user } = req;
    const result = await PostInterestService.findPostInterestsByUserId({
      user_id: user.id,
    });
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const result = await PostService.deletePost(+postId);

    res.status(200).json({
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
    res.status(200).json({
      isMine,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req: any, res: Response, next: NextFunction) => {
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
    res.status(200).json({
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
    res.status(200).json({
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
      res.status(200).json({
        result: false,
      });
    } else {
      res.status(200).json({
        result: true,
      });
    }
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
    res.status(200).json({
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
    res.status(200).json({
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
