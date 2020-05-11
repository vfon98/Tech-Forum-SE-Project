const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  hidden: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

RoomSchema.virtual('total_posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'room_id',
  count: true,
})

RoomSchema.virtual('total_news', {
  ref: 'News',
  localField: '_id',
  foreignField: 'room_id',
  count: true,
})

module.exports = mongoose.model('Room', RoomSchema)
