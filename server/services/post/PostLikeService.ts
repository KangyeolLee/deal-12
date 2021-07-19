import { execQuery } from "../../database/database";
import { CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID, FIND_INTEREST_FOR_POST_BY_ID_AND_USERID } from "../../queries/post";

export const PostLikeService = {
  createPostLikeService: async ({ post_id, user_id }: { post_id: number, user_id: number}) => {
    const data = await execQuery(CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID({ post_id, user_id}));
    return data;
  },
  deletePostLikeService: () => {
    // DELETE FROM `like` WHERE post_id={postId} and user_id={userId}
  },
  findPostLikesByUserIdService: async ({ post_id, user_id }: { post_id: number, user_id: number}) => {
    const data = await execQuery(FIND_INTEREST_FOR_POST_BY_ID_AND_USERID({ post_id, user_id }));
    return data;
  },
};
