const router = require('express').Router();

const userRouter = require('./users');
const authRouter = require('./auth');
const postRouter = require('./posts');
const profileRouter = require('./profile');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/profile', profileRouter);

module.exports = router;
