const Post = require('../models/Post');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  createPost(req, res) {
    const post = new Post({
      user_id: ObjectId(req.body.userID),
      room_id: ObjectId(req.body.roomID),
      content: req.body.content,
    });
    post
      .save()
      .then(post => {
        res.status(200).json({ post });
      })
      .catch(err => {
        res.status(400).json({ err });
      });
  },
  getPost(req, res) {
    const id = ObjectId(req.params.id);
    Post.findById(id)
      .then(post => {
        res.status(200).json({ post });
      })
      .catch(err => {
        res.status(400).json({ err });
      });
  },
  updatePost(req, res) {},
  deletePost(req, res) {
    const id = ObjectId(req.params.id);
    Post.findByIdAndRemove(id).then(post =>
      res.status(200).json({ message: 'Deleted post' })
    ).catch(err => {
      res.status(400).json({ err })
    });
  },
};
