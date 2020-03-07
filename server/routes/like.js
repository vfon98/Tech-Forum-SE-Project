const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const LikeControllers = require('../controllers/likeController');

router.use(authenticate);

router.post('/', LikeControllers.createLike);

module.exports = router;