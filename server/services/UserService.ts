import { config } from 'dotenv';

const mysql = require('mysql2');

export type UserType = {
  user_id: number;
  location1_id: number;
  location2_id: number;
};

export const UserService = {
  createUser: async ({ user_id, location1_id }: UserType) => {
    const connection = await mysql.createConnection(config);
    const { err, results } = await connection.query(
      `INSERT INTO user('user_id', 'location1_id') VALUES(${user_id}, ${location1_id});`
    );
    if (err) throw Error;
    connection.end();
    return results;
  },

  updateUser: async ({ user_id, location1_id, location2_id }: UserType) => {
    const connection = await mysql.createConnection(config);
    const { err, results } = await connection.query(
      `UPDATE post SET location1_id=${location1_id} location2_id=${location2_id} WHERE user_id=${user_id};`
    );
    if (err) throw Error;
    connection.end();
    return results;
  },

  findUserById: async ({ user_id }: UserType) => {
    const connection = await mysql.createConnection(config);
    const { err, results } = await connection.query(
      `SELECT * FROM user WHERE id=${user_id};`
    );
    if (err) throw Error;
    connection.end();
    return results;
  },
};
