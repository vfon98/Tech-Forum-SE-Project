const Room = require('../models/Room');

module.exports = {
  getAllRoom(req, res) {
    Room.find()
      .select('id name image')
      .populate('total_posts')
      .populate('total_news')
      .then(rooms => {
        res.json({ rooms });
      })
      .catch(err => {
        res.status(400).json({ message: 'Get rooms failed' });
      });
  },
  getRoomByName(req, res) {
    Room.findOne({ name: req.params.name })
      .select('id name')
      .populate('total_posts')
      .populate('total_news')
      .then(room => {
        res.json({ room });
      })
      .catch(err => res.status(400).json({ err }));
  },
};
