import { UserService, UserType } from '../service/UserService';

const createUser = (user: UserType) => {
  UserService.createUser(user);
};

const updateUser = (user: UserType) => {
  UserService.updateUser(user);
};

const getUserById = () => {
  UserService.findUserById;
};

export const UserController = {
  createUser,
  updateUser,
  getUserById,
};
