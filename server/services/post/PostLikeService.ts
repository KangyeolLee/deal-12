export const PostLikeService = {
  createPostLikeService: () => {
    // INSERT INTO `like`(`user_id`, `post_id`) VALUES ()
  },
  deletePostLikeService: () => {
    // DELETE FROM `like` WHERE post_id={postId} and user_id={userId}
  },
  findPostLikesByUserIdService: () => {
    // SELECT * FROM `like`
    // JOIN post ON postMessage.id = like.post_id
    // WHERE id={post_id}
  },
};
