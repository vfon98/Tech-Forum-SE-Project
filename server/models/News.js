const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    header: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    views: {
      type: Number,
      min: 0,
      default: 0,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
  }
);

NewsSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true
});

NewsSchema.virtual('room', {
  ref: 'Room',
  localField: 'room_id',
  foreignField: '_id',
  justOne: true
})

function populateNews(next) {
  this.populate('user', 'email display_name avatar')
  .populate('room', 'name')
  .populate('likes', 'user_id')
  .populate({
    path: 'comments',
    select: '-post_id -updated_at',
    populate: {
      path: 'user',
      select: '-_id email display_name avatar',
    },
    options: {
      sort: {
        created_at: -1,
      },
    },
  });
  next();
}

NewsSchema.pre(/^find/, populateNews);

module.exports = mongoose.model('News', NewsSchema);
