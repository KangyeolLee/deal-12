import { config } from 'dotenv';
import { execQuery } from '../database/database';
import { CREATE_USER, FIND_BY_USER_NICKNAME } from '../queries/user';

const mysql = require('mysql2');

export type UserType = {
  nickname: string;
  location1_id: number;
  location2_id?: number;
};

export const UserService = {
  createUser: async ({ nickname, location1_id }: UserType) => {
    const result = await execQuery(CREATE_USER({ nickname, location1_id }));
    return result;
  },

  updateUser: async ({ nickname, location1_id, location2_id }: UserType) => {
    const connection = await mysql.createConnection(config);
    const results = await connection.query(
      `UPDATE post SET location1_id=${location1_id} location2_id=${location2_id} WHERE nickname=${nickname};`
    );
    return results[0];
  },

  findUserByNickname: async ({ nickname }: { nickname: string }) => {
    const result = await execQuery(FIND_BY_USER_NICKNAME({ nickname }));
    return result;
  },
};
