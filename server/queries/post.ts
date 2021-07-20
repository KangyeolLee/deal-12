// 지역넘버에 해당하는 모든 포스트 목록 가지고 오는 쿼리
// 지역넘버는 항상 디폴트로 필수적이지만, 만약 0인 경우에는 로그인 되지 않은 유저(위치정보 없는 유저)에게 출력되는 포스트 목록을 가져옴

import { PostType, PostUpdateType } from '../services/post/PostService';

// 카테고리 넘버 = 0 일때는 전체 포스트 목록, 카테고리 넘버가 1 ~ 14 일땐 각각 해당하는 카테고리 포스트 목록
export const FIND_ALL_POSTS = ({
  location_id,
  category_id,
}: {
  location_id: number;
  category_id?: number;
}) => {
  if (!location_id) {
    return `
      SELECT post.id AS id, title, location_id, category_id, post.createdAt, post.updatedAt, content, view_count, price, seller_id, state,
      thumbnail, interest_count, name FROM post
      JOIN location ON location.id = post.location_id
      WHERE state = '판매중'        
    `;
  }

  if (!category_id) {
    return `
      SELECT post.id AS id, title, location_id, category_id, post.createdAt, post.updatedAt, content, view_count, price, seller_id, state,
      thumbnail, interest_count, name FROM post
      JOIN location ON location.id = ${location_id}
      WHERE location_id = ${location_id} AND state = '판매중'
    `;
  }

  return `
    SELECT post.id AS id, title, location_id, category_id, post.createdAt, post.updatedAt, content, view_count, price, seller_id, state,
    thumbnail, interest_count, name FROM post
    JOIN location ON location.id = post.location_id
    WHERE location_id = ${location_id} AND category_id = ${category_id} AND state = '판매중'
  `;
};

// 포스트넘버에 해당하는 하나의 포스트 디테일 가지고 오는 쿼리
export const FIND_POST_BY_POSTID = ({ post_id }: { post_id: number }) => `
  SELECT post.id AS id, i.images, title, location1_id, location2_id, category_id, post.createdAt, post.updatedAt, content, view_count, price, seller_id, state, 
  interest_count, name, user.nickname FROM post
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
export const UPDATE_POST_VIEWCOUNT = ({ post_id }: { post_id: number }) => `
  UPDATE post SET view_count = view_count+1
  WHERE id = ${post_id}  
`;

// 새로운 포스트를 작성하는 쿼리
export const CREATE_POST = ({
  title,
  location_id,
  category_id,
  content,
  view_count,
  price,
  seller_id,
  state,
  thumbnail,
}: PostType) => `
  INSERT INTO post (title, location_id, category_id, content, price, seller_id, state, thumbnail)
  VALUES ('${title}', ${location_id}, ${category_id}, '${content}', ${price}, ${seller_id}, '${state}', '${thumbnail}')
`;

// 기존 포스트 내용 수정하는 쿼리
export const UPDATE_POST = ({
  post_id,
  title,
  location_id,
  category_id,
  content,
  price,
  state,
  thumbnail,
}: PostUpdateType) => `
  UPDATE post SET title='${title}', location_id=${location_id}, category_id=${category_id}, content='${content}',
  price=${price}, state='${state}', thumbnail='${thumbnail}' 
  WHERE post.id = ${post_id}
`;

// 해당 포스트를 삭제하는 쿼리
export const DELETE_POST = ({ post_id }: { post_id: number }) => `
  DELETE FROM post WHERE post.id = ${post_id}
`;

// 포스트번호에 해당하는 포스트의 상태를 변경하는 쿼리
export const UPDATE_POST_STATE_BY_POSTID = ({
  post_id,
  state,
}: {
  post_id: number;
  state: string;
}) => `
  UPDATE post SET state = '${state}'
  WHERE post.id = ${post_id}
`;

// 포스트넘버에 해당하는 포스트의 좋아요 수를 +1 만큼 증가하는 쿼리
export const UPDATE_POST_INTERESTCOUNT = ({ post_id }: { post_id: number }) => `
  UPDATE post SET interest_count = interest_count+1
  WHERE id = ${post_id}
`;

// 유저 닉네임으로 유저가 작성한 글들을 가져오는 쿼리
export const FIND_POST_BY_USER_NICKNAME = ({
  nickname,
}: {
  nickname: string;
}) => `
    SELECT * FROM post
      JOIN user ON user.nickname = '${nickname}'
      JOIN location ON location.id = post.location_id
    WHERE seller_id=user.id
  `;
