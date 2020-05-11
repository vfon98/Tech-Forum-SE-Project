const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  lastest_news: [{
    type: Schema.Types.ObjectId,
    ref: 'New'
  }],
  trending_news: [{
    type: Schema.Types.ObjectId,
    ref: 'New'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Feed', FeedSchema);