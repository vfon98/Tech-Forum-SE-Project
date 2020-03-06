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
    type: {
      type: String,
      enum: ['post', 'news'],
      default: 'post'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Like',
        unique: true
    }],
    comments: [{
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

function autoPopulate(next) {
  this.populate('user_id');
  next();
}

PostSchema.pre('find', autoPopulate);

module.exports = mongoose.model('Post', PostSchema);
