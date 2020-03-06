const express = require('express');
const router = express.Router();
const CommentControllers = require('../controllers/commentController');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);

router.post('/', CommentControllers.createComment);
router.put('/:id', CommentControllers.updateComment);
router.delete('/:id', CommentControllers.deleteComment);


module.exports = router;