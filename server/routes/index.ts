import express from 'express';
import mainRouter from './main';
import postsRouter from './posts';
import authRouter from './auth';
import meRouter from './me';
import usersRouter from './user';
import chatRouter from './chat';

const router = express.Router();

router.use('/main', mainRouter);
router.use('/posts', postsRouter);
router.use('/auth', authRouter);
router.use('/me', meRouter);
router.use('/chat', chatRouter);
router.use('/user', usersRouter);

export default router;
