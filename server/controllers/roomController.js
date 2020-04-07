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
};
