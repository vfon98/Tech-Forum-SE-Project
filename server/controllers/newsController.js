const News = require('../models/News');
const Room = require('../models/Room');
const ObjectId = require('mongoose').Types.ObjectId;
const Uploader = require('../config/cloudinary');

module.exports = {
  createNews(req, res) {
    Room.findOne({ name: req.body.roomName })
      .then(async room => {
        let thumbnail = null;
        if (req.file) {
          thumbnail = await Uploader.uploadImage(req.file.path, 'news');
        }

        const news = await new News({
          header: req.body.header,
          content: req.body.content,
          thumbnail: thumbnail ? thumbnail.url : null,
          user_id: req.user._id,
          room_id: room.id,
        });

        await news.save().then(news => res.json({ news }));
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  allNews(req, res) {
    News.find({})
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
  getRecentNews(req, res) {
    paginateByRoomId(null, req, res);
  },
  getTrendingNews(req, res) {
    News.find({})
      .sort({ views: -1, created_at: -1 })
      .select('-likes -comments')
      .limit(10)
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  getNewsByRoom(req, res) {
    const { name } = req.params;
    Room.findOne({ name })
      .then(room => {
        console.log('room.id', room.id);
        paginateByRoomId(room.id, req, res);
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
  testRoute(req, res) {
    paginateByRoomId(null, req, res);
  },
  updateNews(req, res) {
    const id = ObjectId(req.params.id);
    News.findByIdAndUpdate(
      id,
      {
        header: req.body.header,
        content: req.body.content,
      },
      { new: true }
    )
      .then(news => {
        res.json({ news });
      })
      .catch(err => res.status(400).json({ err }));
  },
};

async function paginateByRoomId(room_id, req, res) {
  const page = parseInt(req.body.page) || 1;
  const size = parseInt(req.body.size) || 10;
  // Find all if room_id doesn't existed
  const condition = room_id ? { room_id } : {};
  // For calculate page
  const total_docs = await News.find(condition).estimatedDocumentCount();
  const total_pages = Math.ceil(total_docs / size);

  News.find(condition)
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
}
