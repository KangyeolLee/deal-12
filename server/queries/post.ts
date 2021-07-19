export const FIND_POST_BY_USER_NICKNAME = ({
  nickname,
}: {
  nickname: string;
}) => `
    SELECT * FROM post
      JOIN user ON user.nickname = '${nickname}'
    WHERE seller_id=user.id
  `;
