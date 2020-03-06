const Like = require('../models/Like');
const Post = require('../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;

function unlikePost(user_id, post_id, res) {
  Like.findOneAndDelete({ user_id, post_id })
    .then(_like => {
      // Remove likes from post
      Post.findByIdAndUpdate(
        _like.post_id,
        {
          $pull: {
            likes: _like.id,
          },
        },
        { new: true }
      ).then(_post => {
        res.json({
          status: 'ok',
          likes: _post.likes.length,
        });
      });
    })
    .catch(() => res.status(400).json({ message: 'Unlike failed' }));
}

module.exports = {
  createLike(req, res) {
    const like = new Like({
      user_id: req.user._id,
      post_id: ObjectId(req.body.postID),
    });
    // Save like then pdate post
    like
      .save()
      .then(_like => {
        Post.findByIdAndUpdate(
          _like.post_id,
          {
            $push: {
              likes: _like,
            },
          },
          { new: true }
        ).then(_post => {
          res.json({
            status: 'ok',
            likes: _post.likes.length,
          });
        });
      })
      .catch(err => {
        // Like second time means unlike
        const { user_id, post_id } = err.keyValue;
        unlikePost(user_id, post_id, res);
      });
  },
};
