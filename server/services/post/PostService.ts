import { execQuery } from '../../database/database';
import { FIND_POST_BY_USER_NICKNAME } from '../../queries/post';
import { FIND_ALL_POSTS, FIND_POST_BY_POSTID, UPDATE_POST_VIEWCOUNT } from '../../queries/post';

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

  findPosts: async ({ location_id, category_id }: { location_id : number, category_id?: number }) => {
    const data = await execQuery(FIND_ALL_POSTS({ location_id, category_id }));
    return data;
  },

  findPostBySellerNickname: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(FIND_POST_BY_USER_NICKNAME({ nickname }));
    return data;
  },

  findPostById: async (post_id: number) => {
    const data = await execQuery(FIND_POST_BY_POSTID({ post_id} ));
    return data;
  },

  updatePostViewCount: async (post_id: number) => {
    const data = await execQuery(UPDATE_POST_VIEWCOUNT({ post_id }));
    return data;
  },
  updatePost: async (post_id: number) => {
    // const data = await execQuery(UPDATE_POST_VIEWCOUNT({ post_id }));
    // return data;
  },
  updatePostState: () => {
    return `UPDATE post SET state={asdf} WHERE id={postId};`;
  },
  deletePost: () => {
    return `DELETE FROM post WHERE id={postId};`;
  },
};
