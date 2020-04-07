const News = require('../models/News');
const Room = require('../models/Room');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  allNews(req, res) {
    News.find({})
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
  getRecentNews(req, res) {},
  getNewsByRoom(req, res) {
    const { name } = req.params;
    Room.findOne({ name })
      .then(room => {
        News.find({ room_id: room._id })
          .select('-likes -comments')
          .then(news => {
            res.json({ total: news.length, news });
          });
      })
      .catch(err => res.status(400).json({ err: 'Not a valid room name!' }));
  },
  randomNews(req, res) {
    const size = req.query.size || 10;
    News.aggregate()
      .sample(size)
      .project('-likes -comments -__v -updated_at')
      .then(news => {
        News.populate(news, {
          path: 'user',
          select: 'avatar display_name',
        }).then(news => {
          res.json({ total: news.length, news });
        });
      })
      .catch(err => res.status(400).json({ err }));
  },
  getRelateNews(req, res) {
    const keyword = req.body.keyword || '';
    News.find({ $text: { $search: keyword } })
      .limit(10)
      .then(news => {
        res.json({ total: news.length, news });
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  getNews(req, res) {
    const id = ObjectId(req.params.id);
    News.findByIdAndUpdate(
      id,
      {
        // Random increase view from 1 to 10
        $inc: { views: Math.floor(Math.random() * 10) },
      },
      { new: true }
    )
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
  async testRoute(req, res) {
    const page = parseInt(req.body.page) || 1;
    const size = parseInt(req.body.size) || 10;

    const total_docs = await News.find({}).estimatedDocumentCount();
    const total_pages = Math.ceil(total_docs / size);

    News.find({})
      .skip(size * (page - 1))
      .limit(size)
      .then(news => {
        res.json({
          page,
          size,
          count: news.length,
          total_pages,
          hasNextPage: page < total_pages,
          news,
        });
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
};
