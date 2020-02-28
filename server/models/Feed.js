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
})

module.exports = mongoose.model('Feed', FeedSchema);