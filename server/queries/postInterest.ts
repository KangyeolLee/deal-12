// 포스트넘버에 해당하는 포스트의 좋아요 수를 +1 만큼 증가하는 쿼리
export const UPDATE_POST_INTERESTCOUNT = ({ post_id }: { post_id: number }) => `
  UPDATE post SET interest_count = interest_count+1
  WHERE id = ${post_id}
`;

// 포스트넘버에 좋아요를 누른 유저 정보로 관심항목 테이블에 추가하는 쿼리
export const CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID = ({
  post_id,
  user_id,
}: {
  post_id: number;
  user_id: number;
}) => `
  INSERT INTO interest (post_id, user_id)
  VALUES (${post_id}, ${user_id})
`;

// 포스트넘버에 해당하는 항목을 유저가 이미 좋아요를 눌렀는지 조회하는 쿼리
export const FIND_INTEREST_FOR_POST_BY_ID_AND_USERID = ({
  post_id,
  user_id,
}: {
  post_id: number;
  user_id: number;
}) => `
  SELECT nickname FROM user
  JOIN interest ON interest.user_id = user.id
  WHERE interest.user_id = ${user_id} AND interest.post_id = ${post_id}
`;

// 포스트넘버와 유저아이디에 해당하는 좋아요 지우는 쿼리
export const DELETE_INTEREST_FOR_POST_BY_ID_AND_USERID = ({
  post_id,
  user_id,
}: {
  post_id: number;
  user_id: number;
}) => `
  DELETE FROM interest WHERE post_id=${post_id} AND user_id=${user_id}
`;
