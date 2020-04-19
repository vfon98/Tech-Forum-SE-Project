const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['post', 'news', 'comment', 'unknown'],
      default: 'unknown'
    },
    reasons: [{ type: String }],
    content: {
      type: String,
      default: '',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    news_id: {
      type: Schema.Types.ObjectId,
      ref: 'News'
    },
    comment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Report', ReportSchema);
