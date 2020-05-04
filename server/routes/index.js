const router = require('express').Router();

const userRouter = require('./users');
const authRouter = require('./auth');
const postRouter = require('./posts');
const newsRouter = require('./news');
const profileRouter = require('./profile');
const likeRouter = require('./like');
const commentRouter = require('./comments');
const roomRouter = require('./rooms');
const reportRouter = require('./reports');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/news', newsRouter);
router.use('/profile', profileRouter);
router.use('/likes', likeRouter);
router.use('/comments', commentRouter);
router.use('/rooms', roomRouter);
router.use('/reports', reportRouter);

module.exports = router;
