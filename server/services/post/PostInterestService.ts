import { execQuery } from '../../database/database';
import { FIND_POST_INTERESTS_BY_USER_NICKNAME } from '../../queries/interest';

export const PostInterestService = {
  createPostInterest: () => {
    // INSERT INTO `like`(`user_id`, `post_id`) VALUES ()
  },
  deletePostInterest: () => {
    // DELETE FROM `like` WHERE post_id={postId} and user_id={userId}
  },
  findPostInterestsByUserNickname: async ({
    nickname,
  }: {
    nickname: string;
  }) => {
    const data = await execQuery(
      FIND_POST_INTERESTS_BY_USER_NICKNAME({ nickname: nickname })
    );
    console.log(data);
    return data;
  },
};
