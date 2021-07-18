import { PostService, PostType } from '../services/post/PostService';
import { PostLikeService } from '../services/post/PostLikeService';
import { UserType } from '../services/UserService';

const createPost = (req: any, res: any) => {
  const post = req.body;
  try {
    PostService.cratePost(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const getPosts = (req: any, res: any) => {
  try {
    PostService.findPosts();
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

const getPostByUserId = (req: any, res: any) => {
  const { user_id } = req.body;
  try {
    PostService.findPostByUserId(user_id);
    return res.status(200).json({
      message: 'OK',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
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

const creatPostLike = () => {
  PostLikeService.createPostLikeService();
};

const deletePostLike = () => {
  PostLikeService.deletePostLikeService();
};

const getPostLikesByUserId = () => {
  PostLikeService.findPostLikesByUserIdService();
};

export const PostController = {
  createPost,
  getPosts,
  getPostByUserId,
  deletePost,
  getPostById,
  updatePost,
  updatePostState,
  creatPostLike,
  deletePostLike,
  getPostLikesByUserId,
};
