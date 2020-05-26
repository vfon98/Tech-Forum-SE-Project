const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const PostController = require('../controllers/postController');


router.get('/:id', PostController.getPost);
router.get('/', PostController.allPost);
router.get('/room/:name', PostController.getPostByRoomName);
router.get('/room/:name/hot', PostController.getHotPostsByRoomName);
router.use(authenticate);
router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.post('/block', PostController.blockPost);
router.post('/unblock', PostController.unblockPost);

module.exports = router;
