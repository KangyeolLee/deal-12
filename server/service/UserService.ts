export type UserType = {
  user_id: number;
  location1_id: number;
  location2_id: number;
};

export const UserService = {
  createUser: ({ user_id, location1_id }: UserType) => {
    return `INSERT INTO user('user_id', 'location1_id') VALUES(${user_id}, ${location1_id});`;
  },

  updateUser: ({ user_id, location1_id, location2_id }: UserType) => {
    `UPDATE post SET location1_id=${location1_id} location2_id=${location2_id} WHERE user_id=${user_id};`;
  },

  findUserById: ({ user_id }: UserType) => {
    `SELECT * FROM user WHERE id=${user_id};`;
  },
};
