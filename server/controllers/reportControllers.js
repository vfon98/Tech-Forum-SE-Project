const Report = require('../models/Report');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getAllReport(req, res) {
    Report.find({})
      .then(reports => {
        res.json({ reports });
      })
      .catch(err => res.status(400).json({ err }));
  },
  createReport(req, res) {
    const report = new Report();
    report.type = req.body.type || 'unknown';
    report.content = req.body.content || '';
    report.reasons = req.body.reasons || [];
    report.post_id = req.body.postId ? ObjectId(req.body.postId) : undefined;
    report.news_id = req.body.newsId ? ObjectId(req.body.newsId) : undefined;
    report.comment_id = req.body.commentId ? ObjectId(req.body.commentId) : undefined;
    report.user_id = req.user ? ObjectId(req.user._id) : undefined;

    report
      .save()
      .then(result => {
        res.json({ result });
      })
      .catch(err => res.status(400).json({ err }));
  },
  deleteReport(req, res) {},
};
