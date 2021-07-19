import { Request, Response, NextFunction } from 'express';
import { UserService, UserType } from '../services/UserService';
import jwt, { Secret } from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.userdata || {
      nickname: '우아한런닝맨',
      location1_id: 2,
    };

    const isAlreadyExist = await UserService.findUserByNickname({
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
  UserService.findUserByNickname;
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { nickname } = req.body;

  try {
    const result = await UserService.findUserByNickname({ nickname });

    if (result.length > 0) {
      // access token을 secret key 기반으로 생성
      const generateAccessToken = (nickname: string) => {
        return jwt.sign(
          { id: nickname },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          {
            expiresIn: '1000h',
          }
        );
      };

      let accessToken = generateAccessToken(nickname);

      res.status(200).json({ accessToken });
    } else {
      res.status(300).json({
        message: 'not exist',
      });
    }
  } catch (err) {
    next(err);
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
