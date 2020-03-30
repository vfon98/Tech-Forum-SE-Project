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
  randomNews(req, res) {
    // News.aggregate()
    // .sample(5)
    News.find({})
      .limit(6)
      .then(news => res.json({ news }))
      .catch(err => res.status(400).json({ err }));
  },
  getNews(req, res) {
    const id = ObjectId(req.params.id);
    News.findByIdAndUpdate(
      id,
      {
        // Random increase views from 1 to 10
        $inc: { views: Math.floor(Math.random() * 10) },
      },
      { new: true }
    )
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
};
