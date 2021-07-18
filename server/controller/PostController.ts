import { PostService, PostType } from '../service/post/PostService';
import { PostLikeService } from '../service/post/PostLikeService';
import { UserType } from '../service/UserService';

const createPost = (post: PostType) => {
  PostService.cratePost(post);
};

const getPosts = () => {
  PostService.findPosts();
};

const getPostByUserId = (user: UserType) => {
  PostService.findPostByUserId(user);
};

const deletePost = () => {
  PostService.deletePost();
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
