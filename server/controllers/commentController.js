const Comment = require('../models/Comment');
const Post = require('../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  createComment(req, res) {
    const comment = new Comment({
      user_id: req.user._id,
      post_id: ObjectId(req.body.postID),
      content: req.body.content,
    });
    // Save comment then update post
    comment
      .save()
      .then(_comment => {
        Post.findByIdAndUpdate(
          _comment.post_id,
          {
            $push: {
              comments: _comment,
            },
          },
          { new: true }
        )
          .then(_post => {
            res.json({ status: 'ok', _post });
          });
      })
      .catch(err => res.status(400).json({ err }));
  },
  updateComment(req, res) {
    const id = ObjectId(req.params.id);
    const content = req.body.content;
    // Update comment
    Comment.findByIdAndUpdate(id, { content }, { new: true })
      .then(comment => {
        res.json({ status: 'ok', comment });
      })
      .catch(err => res.status(400).json({ err }));
  },
  deleteComment(req, res) {
    const id = ObjectId(req.params.id);
    // Delete comment first then its post's ref
    Comment.findByIdAndDelete(id)
      .then(_comment => {
        Post.findByIdAndUpdate(_comment.post_id, {
          $pull: {
            comments: _comment.id
          }
        }, { new : true }).then(_post => {
          res.json({ status: 'ok', _comment, _post });
        })
      })
      .catch(err => res.json(400).json({ err, message: 'Delete comment failed' }));
  },
};
