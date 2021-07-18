import { UserService, UserType } from '../services/UserService';

const createUser = (req: any, res: any) => {
  try {
    const user = req.body;
    UserService.createUser(user);
  } catch (error) {}
};

const updateUser = (req: any, res: any) => {
  const user = req.body;
  UserService.updateUser(user);
};

const getUserById = () => {
  UserService.findUserById;
};

const login = async (req: any, res: any) => {
  const { user_id } = req.body;
  try {
    UserService.findUserById(user_id);
    return res.status(200).json({ message: 'OK' });
  } catch (err) {
    return res.status(403).json(err);
  }
};

const logout = async (req: any, res: any) => {};

export const UserController = {
  createUser,
  updateUser,
  getUserById,
  login,
  logout,
};
