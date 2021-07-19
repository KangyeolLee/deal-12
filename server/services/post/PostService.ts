import { execQuery } from '../../database/database';
import { FIND_POST_BY_USER_NICKNAME } from '../../queries/post';
import { UserType } from '../UserService';

export type PostType = {
  title: string;
  location_id: number;
  category_id: number;
  content: string;
  price: number;
  seller_id: number;
  state: string;
};

export const PostService = {
  cratePost: ({
    title,
    location_id,
    category_id,
    content,
    price,
    seller_id,
    state,
  }: PostType) => {
    return `
    INSERT INTO post('title', 'location_id', 'category_id', 'content', 'price', 'seller_id', 'state') VALUES
      (${title},
      ${location_id},
      ${category_id},
      ${content},
      ${price},
      ${seller_id},
      ${state});`;
  },

  findPosts: () => {
    return `SELECT * FROM post limit 25 offset 1;`;
  },

  findPostBySellerNickname: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(FIND_POST_BY_USER_NICKNAME({ nickname }));
    return data;
  },

  findPostById: (post_id: number) => {
    return `
    SELECT * FROM post
      join image ON image.post_id = post.id
      WHERE id=${post_id};`;
  },

  updatePostViewCount: () => {
    return `UPDATE post SET view_count=view_count + 1 WHERE id={postId};`;
  },
  updatePost: () => {
    return `UPDATE post SET title={asdf} WHERE id={postId};`;
  },
  updatePostState: () => {
    return `UPDATE post SET state={asdf} WHERE id={postId};`;
  },
  deletePost: () => {
    return `DELETE FROM post WHERE id={postId};`;
  },
};
