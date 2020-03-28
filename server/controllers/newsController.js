const News = require('../models/News');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  allNews(req, res) {
    News.find({})
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
  getNews(req, res) {
    const id = ObjectId(req.params.id);
    News.findByIdAndUpdate(
      id,
      {
        $inc: { views: 5 },
      },
      { new: true }
    )
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
};
