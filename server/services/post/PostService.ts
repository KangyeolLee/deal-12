import { execQuery } from '../../database/database';
import { CREATE_IMAGES } from '../../queries/image';
import {
  CREATE_POST,
  DELETE_POST,
  FIND_POST_BY_USER_NICKNAME,
  FIND_POST_WHETHER_BELONG_TO_ME,
  UPDATE_POST,
  UPDATE_POST_STATE_BY_POSTID,
  FIND_ALL_POSTS,
  FIND_POST_BY_POSTID,
  UPDATE_POST_VIEWCOUNT,
  DELETE_POST_IMAGE_BY_URL,
} from '../../queries/post';

export type PostType = {
  title: string;
  location_id: number;
  category_id: number;
  content: string;
  price?: number;
  seller_id: number;
  state: string;
  thumbnail: string;
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
  chatroom_count?: number;
};

export const PostService = {
  cratePost: async ({
    title,
    location_id,
    category_id,
    seller_id,
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
        content,
        price,
        seller_id,
        state,
        thumbnail,
      })
    );
    return data;
  },

  createPostImage: async (post_id: number, files: Express.Multer.File[]) => {
    const data = await execQuery(CREATE_IMAGES(post_id, files));
    return data;
  },

  findPosts: async ({
    location_id,
    category_id,
    offset,
  }: {
    location_id: number;
    category_id?: number;
    offset: number;
  }) => {
    const data = await execQuery(
      FIND_ALL_POSTS({ location_id, category_id, offset })
    );
    return data;
  },

  findPostBySellerNickname: async ({ nickname }: { nickname: string }) => {
    const data = await execQuery(FIND_POST_BY_USER_NICKNAME({ nickname }));
    return data;
  },

  findPostById: async ({ post_id }: { post_id: number }) => {
    const data = await execQuery(FIND_POST_BY_POSTID({ post_id }));
    return data;
  },

  updatePostViewCount: async ({ post_id }: { post_id: number }) => {
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
  deletePost: async ({ post_id }: { post_id: number }) => {
    const data = await execQuery(DELETE_POST({ post_id }));
    return data;
  },
  deletePostImages: async ({
    post_id,
    urls = [],
  }: {
    post_id: number;
    urls: string[];
  }) => {
    if (typeof urls === 'string') {
      const url = urls as string;
      await execQuery(DELETE_POST_IMAGE_BY_URL({ post_id, url }));
    } else {
      for (const url of urls) {
        await execQuery(DELETE_POST_IMAGE_BY_URL({ post_id, url }));
      }
    }
    return true;
  },
  checkMyPost: async ({
    post_id,
    user_id,
  }: {
    post_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      FIND_POST_WHETHER_BELONG_TO_ME({ post_id, user_id })
    );
    if (data.length) return true;
    return false;
  },
};
