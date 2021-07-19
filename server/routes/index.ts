import express from 'express';
import mainRouter from './main';
import postsRouter from './posts';
import authRouter from './auth';
import usersRouter from './users';

const router = express.Router();

router.use('/main', mainRouter);
router.use('/posts', postsRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
