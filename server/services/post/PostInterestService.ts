import { execQuery } from '../../database/database';
import { FIND_POST_INTERESTS_BY_USERID } from '../../queries/interest';
import {
  CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID,
  DELETE_INTEREST_FOR_POST_BY_ID_AND_USERID,
  FIND_INTEREST_FOR_POST_BY_ID_AND_USERID,
  UPDATE_POST_INTERESTCOUNT,
} from '../../queries/postInterest';

export const PostInterestService = {
  createPostInterest: async ({
    post_id,
    user_id,
  }: {
    post_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID({ post_id, user_id })
    );
    return data;
  },

  deletePostInterest: async ({
    post_id,
    user_id,
  }: {
    post_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      DELETE_INTEREST_FOR_POST_BY_ID_AND_USERID({ post_id, user_id })
    );
    return data;
  },

  findPostInterestsByUserId: async ({ user_id }: { user_id: number }) => {
    const data = await execQuery(FIND_POST_INTERESTS_BY_USERID({ user_id }));
    return data;
  },

  findPostAlreadyInterestedByUserAndPostId: async ({
    post_id,
    user_id,
  }: {
    post_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      FIND_INTEREST_FOR_POST_BY_ID_AND_USERID({ post_id, user_id })
    );
    return data;
  },

  updatePostInterestCount: async ({ post_id }: { post_id: number }) => {
    const data = await execQuery(UPDATE_POST_INTERESTCOUNT({ post_id }));
    return data;
  },
};
