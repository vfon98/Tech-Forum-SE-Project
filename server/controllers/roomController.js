const Room = require('../models/Room');
const uploader = require('../config/cloudinary');

module.exports = {
  getAllRoom(req, res) {
    Room.find({ hidden: { $ne: true } })
      .select('id name image created_at')
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
  async createRoom(req, res) {
    let thumbnail = null;
    if (req.file) {
      thumbnail = await uploader.uploadImage(req.file.path, 'covid-forum');
    }
    const room = new Room({
      name: req.body.roomName,
      description: req.body.description,
      image: thumbnail ? thumbnail.url : null,
    });
    room
      .save()
      .then(room => {
        res.json({ room });
      })
      .catch(err => res.status(400).json({ err }));
  },
  hideRoom(req, res) {
    const id = req.body.roomId;
    Room.findByIdAndUpdate(id, { hidden: true })
      .then(room => {
        res.json({ room });
      })
      .catch(err => res.status(400).json({ err }));
  },
  activeRoom(req, res) {
    const id = req.body.roomId;
    Room.findByIdAndUpdate(id, { hidden: false })
      .then(room => {
        res.json({ room });
      })
      .catch(err => res.status(400).json({ err }));
  },
};
