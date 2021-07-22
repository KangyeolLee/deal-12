import express from 'express';
import { UserController } from '../controllers/UserController';
import { authenticateAccessToken } from '../middlewares/authenticate';

const usersRouter = express.Router();

usersRouter.get('/:userId', UserController.getUserById);

export default usersRouter;
