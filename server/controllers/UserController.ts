import { Request, Response, NextFunction } from 'express';
import { UserService, UserType } from '../services/UserService';
import jwt, { Secret } from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.userdata || {
      nickname: '우아한런닝맨',
      location1_id: 2,
    };

    const isAlreadyExist = await UserService.findUserByUsername({
      nickname: user.nickname,
    });

    if (isAlreadyExist) {
      res.status(300).json({
        message: '이미 존재하는 아이디 입니다...',
      });
    }

    const result = await UserService.createUser(user);
    res.status(200).json({
      message: 'ok',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = (req: Request, res: Response) => {
  const user = req.body;
  UserService.updateUser(user);
};

const getUserById = () => {
  UserService.findUserByUsername;
};

const login = async (req: Request, res: Response) => {
  const { nickname } = req.body;

  try {
    UserService.findUserByUsername(nickname);

    // access token을 secret key 기반으로 생성
    const generateAccessToken = (nickname: string) => {
      return jwt.sign(
        { id: nickname },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: '15m',
        }
      );
    };

    let accessToken = generateAccessToken(nickname);

    return res.status(200).json({ accessToken });
  } catch (err) {
    return res.status(403).json(err);
  }
};

const logout = async (req: Request, res: Response) => {};

export const UserController = {
  createUser,
  updateUser,
  getUserById,
  login,
  logout,
};
