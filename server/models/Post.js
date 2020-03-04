const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true
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
  },
  { 
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
  }
);

module.exports = mongoose.model('Post', PostSchema);
