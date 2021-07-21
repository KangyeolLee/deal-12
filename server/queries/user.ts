import { UserType } from '../services/UserService';

export const CREATE_USER = ({ nickname, location1_id }: UserType) => `
  INSERT INTO user(nickname, location1_id) 
  VALUES('${nickname}', ${location1_id});
`;

export const FIND_BY_USER_NICKNAME = ({ nickname }: { nickname: string }) => `
  SELECT id, nickname, location1_id, location2_id FROM user
  WHERE nickname = '${nickname}';
`;

// 바꿀때는 1,2 둘다 들어옴
// 2 삭제할 때는 1 안들어오고 2는 Null
// 1 삭제할 때는 1 들어오고 2는 Null
// 2 들어올 때는 1 안들어오고 2 들어옴
export const UPDATE_USER_LOCATION = ({
  nickname,
  location1_id,
  location2_id = null,
}: UserType) => {
  if (location1_id === -1) {
    // 2 삭제 또는 2 새로 들어올 때
    return `
      UPDATE user SET location2_id = ${location2_id} 
      WHERE nickname='${nickname}';
    `;
  }
  return `
    UPDATE user SET location1_id = ${location1_id}, 
    location2_id = ${location2_id} 
    WHERE nickname='${nickname}';
  `;
};
