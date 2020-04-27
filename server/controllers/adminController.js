const Post = require('../models/Post');
const News = require('../models/News');
const User = require('../models/User');
const Report = require('../models/Report');

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
};
