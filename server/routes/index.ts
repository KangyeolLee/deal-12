import express from 'express';
import mainRouter from './main';
import postsRouter from './posts';
import authRouter from './auth';
import usersRouter from './me';
import chatRouter from './chat';

const router = express.Router();

router.use('/main', mainRouter);
router.use('/posts', postsRouter);
router.use('/auth', authRouter);
router.use('/me', usersRouter);
router.use('/chat', chatRouter);

export default router;
