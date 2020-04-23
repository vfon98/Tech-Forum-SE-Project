const Post = require('../models/Post');
const Room = require('../models/Room');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  createPost(req, res) {
    Room.findOne({ name: req.body.roomName })
      .select('id')
      .then(room => {
        // Insert post
        const post = new Post({
          user_id: req.user._id,
          room_id: ObjectId(room.id),
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
      })
      .catch(err => res.status(404).json({ err }));
  },
  allPost(req, res) {
    Post.find({ type: 'post' })
      .then(posts => res.json({ posts }))
      .catch(err => res.status(400).json({ err }));
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
  getPostByRoomName(req, res) {
    const room_name = req.params.name;
    Room.findOne({ name: room_name })
      .then(room => {
        if (room) {
          Post.find({ type: 'post', room_id: room.id })
            .then(posts => {
              res.json({ posts });
            })
            .catch(err => res.json(400).json({ err }));
        } else {
          res.status(400).json({ err: 'Not a valid room name!' });
        }
      })
      .catch(err => res.json(400).json({ err }));
  },
  updatePost(req, res) {},
  deletePost(req, res) {
    const id = ObjectId(req.params.id);
    Post.findByIdAndRemove(id)
      .then(post => res.status(200).json({ message: 'Deleted post' }))
      .catch(err => {
        res.status(400).json({ err });
      });
  },
};
