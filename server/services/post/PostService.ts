import { execQuery } from '../../database/database';
import {
  CREATE_POST,
  DELETE_POST,
  FIND_POST_BY_USER_NICKNAME,
  FIND_POST_WHETHER_BELONG_TO_ME,
  UPDATE_POST,
  UPDATE_POST_STATE_BY_POSTID,
} from '../../queries/post';
import {
  FIND_ALL_POSTS,
  FIND_POST_BY_POSTID,
  UPDATE_POST_VIEWCOUNT,
} from '../../queries/post';

export type PostType = {
  title: string;
  location_id: number;
  category_id: number;
  content: string;
  view_count: number;
  price?: number;
  seller_id: number;
  state: string;
  thumbnail: string;
  interest_count: number;
};

export type PostUpdateType = {
  post_id: number;
  title?: string;
  location_id?: number;
  category_id?: number;
  content?: string;
  view_count?: number;
  price?: number;
  seller_id?: number;
  state?: string;
  thumbnail?: string;
  interest_count?: number;
};

export const PostService = {
  cratePost: async ({
    title,
    location_id,
    category_id,
    view_count,
    seller_id,
    interest_count,
    content,
    price,
    state,
    thumbnail,
  }: PostType) => {
    const data = await execQuery(
      CREATE_POST({
        title,
        location_id,
        category_id,
        view_count,
        content,
        price,
        seller_id,
        state,
        thumbnail,
        interest_count,
      })
    );
    return data;
  },

  findPosts: async ({
    location_id,
    category_id,
  }: {
    location_id: number;
    category_id?: number;
  }) => {
    const data = await execQuery(FIND_ALL_POSTS({ location_id, category_id }));
    return data;
  },

  findPostBySellerNickname: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(FIND_POST_BY_USER_NICKNAME({ nickname }));
    return data;
  },

  findPostById: async (post_id: number) => {
    const data = await execQuery(FIND_POST_BY_POSTID({ post_id }));
    return data;
  },

  updatePostViewCount: async (post_id: number) => {
    const data = await execQuery(UPDATE_POST_VIEWCOUNT({ post_id }));
    return data;
  },
  updatePost: async ({
    post_id,
    title,
    price,
    content,
    location_id,
    category_id,
    state,
    thumbnail,
  }: PostUpdateType) => {
    const data = await execQuery(
      UPDATE_POST({
        post_id,
        title,
        price,
        content,
        location_id,
        category_id,
        state,
        thumbnail,
      })
    );
    return data;
  },
  updatePostState: async ({
    post_id,
    state,
  }: {
    post_id: number;
    state: string;
  }) => {
    const data = await execQuery(
      UPDATE_POST_STATE_BY_POSTID({ post_id, state })
    );
    return data;
  },
  deletePost: async (post_id: number) => {
    const data = await execQuery(DELETE_POST({ post_id }));
    return data;
  },
  checkMyPost: async ({ post_id, user_id }: { post_id: number, user_id: number }) => {
    const data = await execQuery(FIND_POST_WHETHER_BELONG_TO_ME({post_id, user_id}));
    if (data.length) return true;
    return false;
  }
};
