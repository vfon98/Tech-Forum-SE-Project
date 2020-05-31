const Post = require('../models/Post');
const News = require('../models/News');
const User = require('../models/User');
const Report = require('../models/Report');
const Room = require('../models/Room');

module.exports = {
  async getDashboard(req, res) {
    try {
      const total_posts = await Post.estimatedDocumentCount();
      const total_news = await News.estimatedDocumentCount();
      const total_users = await User.estimatedDocumentCount();
      const total_reports = await Report.estimatedDocumentCount();
      res.json({ total_posts, total_news, total_users, total_reports });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  allUsers(req, res) {
    User.find({ is_banned: false })
      .where('role')
      .ne('admin')
      .sort({ created_at: -1 })
      .then(users => {
        res.json({ users });
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  getBannedUsers(req, res) {
    User.find({ is_banned: true })
      .then(users => {
        res.json({ users });
      })
      .catch(err => res.status(400).json({ err }));
  },
  banUser(req, res) {
    const { userId, expiredDate } = req.body;
    console.log('user_id', userId, expiredDate);
    User.findByIdAndUpdate(
      userId,
      {
        is_banned: true,
        ban_expired_at: new Date(expiredDate),
      },
      {
        new: true,
      }
    )
      .then(user => {
        res.json({ user });
      })
      .catch(err => res.status(400).json({ err }));
  },
  unbanUser(req, res) {
    const { userId } = req.body;
    User.findByIdAndUpdate(
      userId,
      { is_banned: false, ban_expired_at: null },
      { new: true }
    )
      .then(user => {
        res.json({ user });
      })
      .catch(err => console.log(err));
  },
  getAllRoooms(req, res) {
    Room.find({})
      .populate('total_posts')
      .populate('total_news')
      .then(rooms => {
        res.json({ rooms });
      })
      .catch(err => res.status(400).json({ err }));
  },
};
