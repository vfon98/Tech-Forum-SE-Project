const Room = require('../models/Room');

module.exports = {
  getAllRoom(req, res) {
    Room.find().select('_id name')
      .then(rooms => {
        res.json({ rooms });
      })
      .catch(err => {
        res.status(400).json({ message: 'Get rooms failed' });
      });
  },
};
