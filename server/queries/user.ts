import { UserType } from '../services/UserService';

export const CREATE_USER = ({ nickname, location1_id }: UserType) => `
  INSERT INTO user(nickname, location1_id) 
  VALUES('${nickname}', ${location1_id});
`;

export const FIND_BY_USER_NICKNAME = ({ nickname }: { nickname: string }) => `
  SELECT id, nickname, location1_id, location2_id FROM user
  WHERE nickname = '${nickname}';
`;

export const UPDATE_USER_LOCATION = ({
  nickname,
  location1_id,
  location2_id,
}: UserType) => {
  // location2 추가되는 경우
  // location1 location2 바뀌는 경우
  // location1 삭제되는 경우 -> 프론트에서 location2로 보내줌
  // location2 삭제되는 경우
  location2_id = location2_id ? location2_id : null;
  return `
    UPDATE user SET location1_id = CASE WHEN ${location1_id} IS NULL THEN location1_id ELSE ${location1_id} END), 
    location2_id = ${location2_id} 
    WHERE nickname='${nickname}'
  `;
};
