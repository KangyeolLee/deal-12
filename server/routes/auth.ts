// POST /auth/login
// POST /auth/register
// INSERT INTO `user`('user_id', 'location1_id') VALUES ();
import express from 'express';
import { UserController } from '../controllers/UserController';

export const router = express.Router();

router.post('/login', UserController.login);
router.get('/register', UserController.createUser);
router.get('/logout', UserController.logout);
