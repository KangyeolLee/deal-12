// 지역넘버에 해당하는 모든 포스트 목록 가지고 오는 쿼리
// 카테고리 넘버 = 0 일때는 전체 포스트 목록, 카테고리 넘버가 1 ~ 14 일땐 각각 해당하는 카테고리 포스트 목록
export const FIND_ALL_POSTS = ({ location_id, category_id } : { location_id: number, category_id?: number}) => {
  if (!category_id) {
    return `
      SELECT * FROM post
      JOIN location ON location.id = ${location_id}
      WHERE location_id = ${location_id} AND state = '판매중'
    `;
  }

  return `
    SELECT * FROM post
    JOIN location ON location.id = post.location_id
    WHERE location_id = ${location_id} AND category_id = ${category_id} AND state = '판매중'
  `;
}

// 포스트넘버에 해당하는 하나의 포스트 디테일 가지고 오는 쿼리
export const FIND_POST_BY_POSTID = ({ post_id }: { post_id: number}) => `
  SELECT * FROM post
  INNER JOIN (
    SELECT post_id, JSON_ARRAYAGG(url) AS images
    FROM image
    GROUP BY post_id
  ) AS i
  ON i.post_id = post.id
  JOIN user ON user.id = post.seller_id
  JOIN location ON location.id = post.location_id
  WHERE post.id = ${post_id}
`;

// 포스트넘버에 해당하는 포스트의 조회수 +1 만큼 증가하는 쿼리
export const UPDATE_POST_VIEWCOUNT = ({ post_id }: { post_id: number}) => `
  UPDATE post SET view_count = view_count+1
  WHERE id = ${post_id}  
`

// 포스트넘버에 해당하는 포스트의 좋아요 수를 +1 만큼 증가하는 쿼리
export const UPDATE_POST_INTERESTCOUNT = ({ post_id }: { post_id: number}) => `
  UPDATE post SET interest_count = interest_count+1
  WHERE id = ${post_id}
`

// 포스트넘버에 좋아요를 누른 유저 정보로 관심항목 테이블에 추가하는 쿼리
export const CREATE_INTEREST_FOR_POST_BY_ID_AND_USERID = ({ post_id, user_id }: { post_id: number, user_id: number }) => `
  INSERT INTO interest (post_id, user_id)
  VALUES (${post_id}, ${user_id})
`

// 포스트넘버에 해당하는 항목을 유저가 이미 좋아요를 눌렀는지 조회하는 쿼리
export const FIND_INTEREST_FOR_POST_BY_ID_AND_USERID = ({ post_id, user_id }: { post_id: number, user_id: number }) => `
  SELECT nickname FROM user
  JOIN interest ON interest.user_id = user.id
  WHERE interest.user_id = ${user_id} AND intertest.post_id = ${post_id}
`