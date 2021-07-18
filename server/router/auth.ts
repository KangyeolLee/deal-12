// POST /auth/login
// POST /auth/register
// INSERT INTO `user`('user_id', 'location1_id') VALUES ();
import express from 'express';
import { UserController } from '../controller/UserController';

export const router = express.Router();
// GET /auth/logout
router.post('/login', async (req: any, res: any, next: any) => {
  try {
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/register', async (req: any, res: any, next: any) => {
  try {
    UserController.createUser(req.body);
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
