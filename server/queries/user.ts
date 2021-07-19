import { UserType } from '../services/UserService';

export const CREATE_USER = ({ nickname, location1_id }: UserType) => `
  INSERT INTO user(nickname, location1_id) 
  VALUES('${nickname}', ${location1_id});
`;

export const FIND_BY_USER_NICKNAME = ({ nickname }: { nickname: string }) => `
  SELECT nickname FROM user
  WHERE nickname = '${nickname}';
`;
