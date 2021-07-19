export const FIND_POST_INTERESTS_BY_USER_NICKNAME = ({
  nickname,
}: {
  nickname: string;
}) => `
  SELECT * FROM interest
    JOIN post ON post.id = interest.post_id
    JOIN user ON user.nickname = '${nickname}'
  WHERE user_id=user.id
`;
