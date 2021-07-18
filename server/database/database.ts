import { readFileSync } from 'fs';
import mysql, { RowDataPacket } from 'mysql2/promise';
import path from 'path';
import config from './config';

const getConnection = async () => {
  return await mysql.createConnection(config);
};

export const initDatabase = async () => {
  const connection = await getConnection();
  const sqlForCreation = readFileSync(path.join(__dirname, './init.sql'));
  const queries = sqlForCreation.toString().split('----------');

  try {
    for (const query of queries) {
      await connection.query(query);
    }
  } catch (error) {
    throw new Error('[DB테이블생성오류] ' + error.message);
  } finally {
    connection.end();
  }
};

export const execQuery = async (
  query: string,
  values?: (string | number)[]
) => {
  const connection = await getConnection();

  try {
    const [result] = (await connection.query(query, values)) as RowDataPacket[];
    return result;
  } catch (error) {
    throw new Error('[쿼리실행오류] ' + error.message);
  } finally {
    connection.end();
  }
};
