// POST /auth/login
// POST /auth/register
// INSERT INTO `user`('user_id', 'location1_id') VALUES ();
import express from 'express';
import { UserController } from '../controllers/UserController';

const authRouter = express.Router();

authRouter.post('/login', UserController.login);
authRouter.post('/register', UserController.createUser);
authRouter.get('/logout', UserController.logout);

export default authRouter;
