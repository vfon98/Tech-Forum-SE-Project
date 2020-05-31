const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    isAdmin: Boolean,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
  }
);

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

function populateComment(next) {
  this.populate('user', '-_id email display_name avatar role');
  next();
}

CommentSchema.pre(/^find/, populateComment);

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id'
})

module.exports = mongoose.model('Comment', CommentSchema);
