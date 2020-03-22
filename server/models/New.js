const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  views: {
    type: Number,
    min: 0,
    default: 0
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Like'
  }],
  comment: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }],
})

module.exports = NewSchema;