const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  types: [{ type: String }],
  content: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Report', Schema);
