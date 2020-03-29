const Comment = require('../models/Comment');
const Post = require('../models/Post');
const News = require('../models/News');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  allComments(req, res) {
    Comment.find({})
      .then(comments => {
        res.json({ comments });
      })
      .catch(err => console.log(err));
  },
  getByPostId(req, res) {
    const id = req.params.id;
    Post.findById(id)
      .then(_post => {
        res.json({ comments: _post.comments });
      })
      .catch(err => console.log(err));
  },
  createComment(req, res) {
    const comment = new Comment({
      user_id: req.user._id,
      post_id: ObjectId(req.body.postID),
      content: req.body.content,
    });
    const type = req.body.type || 'post';
    // Save comment then update post
    comment
      .save()
      .then(_comment => {
        getModelByType(type)
          .findByIdAndUpdate(
            _comment.post_id,
            {
              $push: {
                comments: _comment,
              },
            },
            { new: true }
          )
          .then(_post => {
            res.json({ status: 'ok', comments: _post.comments });
          });
      })
      .catch(err => res.status(400).json({ err }));
  },
  updateComment(req, res) {
    const id = ObjectId(req.params.id);
    const content = req.body.content;
    const type = req.body.type || 'post';

    // Update comment
    Comment.findByIdAndUpdate(id, { content }, { new: true })
      .then(comment => {
        getModelByType(type).findById(comment.post_id)
          .then(_post => {
            res.json({
              status: 'ok',
              old: comment,
              comments: _post.comments,
            });
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json({ err }));
  },
  deleteComment(req, res) {
    const id = ObjectId(req.params.id);
    const type = req.query.type || 'post';

    // Delete comment first then its post's ref
    Comment.findByIdAndDelete(id)
      .then(_comment => {
        getModelByType(type).findByIdAndUpdate(
          _comment.post_id,
          {
            $pull: {
              comments: _comment.id,
            },
          },
          { new: true }
        ).then(_post => {
          res.json({
            status: 'ok',
            old: _comment,
            comments: _post.comments,
          });
        });
      })
      .catch(err =>
        res.json(400).json({ err, message: 'Delete comment failed' })
      );
  },
};

function getModelByType(type) {
  if (type === 'post') return Post;
  else if (type === 'news') return News;
  else return null;
}
