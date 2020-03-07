const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    index: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

LikeSchema.index(
  {
    'user_id': 1,
    'post_id': 1,
  },
  { unique: true }
);

module.exports = mongoose.model('Like', LikeSchema);
