// POST /auth/login
// POST /auth/register
// INSERT INTO `user`('user_id', 'location1_id') VALUES ();
import express from 'express';
import { UserController } from '../controllers/UserController';

const authRouter = express.Router();

// @ GET 요청
// 로그아웃 처리
authRouter.get('/logout', UserController.logout);

// @ POST 요청
// 로그인 처리
authRouter.post('/login', UserController.login);
// 회원가입 처리
authRouter.post('/register', UserController.createUser);

export default authRouter;
