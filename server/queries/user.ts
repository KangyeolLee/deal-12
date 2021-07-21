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
  location2_id = null,
}: UserType) => {
  console.log(location1_id, location2_id);
  return `
    UPDATE user SET location1_id = ${location1_id}, 
    location2_id = ${location2_id} 
    WHERE nickname='${nickname}'
  `;
};
