const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    type: {
      type: String,
      enum: ['post', 'news'],
      default: 'post',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
        // unique: true,
        // sparse: true,
        // default: null
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

// PostSchema.path('likes').index({ sparse: true });

PostSchema.virtual('room', {
  ref: 'Room',
  localField: 'room_id',
  foreignField: '_id',
  justOne: true,
});

PostSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

function populatePost(next) {
  this.sort({ created_at: -1 })
    .populate('user', 'email display_name avatar')
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

PostSchema.pre(/^find/, populatePost);

module.exports = mongoose.model('Post', PostSchema);
