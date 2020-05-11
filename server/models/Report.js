const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['post', 'news', 'comment', 'unknown'],
      default: 'unknown',
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
      ref: 'News',
    },
    comment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReportSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

function populateReport(next) {
  this.populate({
    path: 'user',
    select: 'display_name email avatar'
  });
  next();
}

ReportSchema.pre(/^find/, populateReport);

module.exports = mongoose.model('Report', ReportSchema);
