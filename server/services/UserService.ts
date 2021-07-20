import { execQuery } from '../database/database';
import { CREATE_USER, FIND_BY_USER_NICKNAME } from '../queries/user';
import { UPDATE_USER_LOCATION } from './../queries/user';

export type UserType = {
  nickname: string;
  location1_id: number;
  location2_id?: number | null;
};

export const UserService = {
  createUser: async ({ nickname, location1_id }: UserType) => {
    const result = await execQuery(CREATE_USER({ nickname, location1_id }));
    return result;
  },

  updateUserLocation: async ({
    nickname,
    location1_id,
    location2_id,
  }: UserType) => {
    const result = await execQuery(
      UPDATE_USER_LOCATION({ nickname, location1_id, location2_id })
    );
    return result;
  },

  findUserByNickname: async ({ nickname }: { nickname: string }) => {
    const result = await execQuery(FIND_BY_USER_NICKNAME({ nickname }));
    return result;
  },
};
