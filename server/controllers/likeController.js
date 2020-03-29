const Like = require('../models/Like');
const Post = require('../models/Post');
const News = require('../models/News');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  createLike(req, res) {
    const like = new Like({
      user_id: req.user._id,
      post_id: ObjectId(req.body.postID),
    });
    const type = req.body.type || 'post';
    // Save like then pdate post
    like
      .save()
      .then(_like => {
        getModelByType(type).findByIdAndUpdate(
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
        unlikePost(user_id, post_id, type, res);
      });
  },
};

function unlikePost(user_id, post_id, type, res) {
  Like.findOneAndDelete({ user_id, post_id })
    .then(_like => {
      // Remove likes from post
      getModelByType(type).findByIdAndUpdate(
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

function getModelByType(type) {
  if (type === 'post') return Post;
  else if (type === 'news') return News;
  else return null;
}
