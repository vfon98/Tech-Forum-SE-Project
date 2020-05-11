const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      // required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not valid',
      },
    },
    password_hash: {
      type: String,
      select: false,
    },
    display_name: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: String,
    gender: String,
    address: String,
    status: String,
    role: String,
    login_method: String,
    fbID: String,
    is_banned: {
      type: Boolean,
      default: false,
    },
    ban_expired_at: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
  }
);

UserSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'user_id',
  justOne: true,
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user_id',
});

UserSchema.virtual('news', {
  ref: 'News',
  localField: '_id',
  foreignField: 'user_id',
});

UserSchema.methods.hashPassword = function (rawPassword) {
  this.password_hash = bcrypt.hashSync(rawPassword, 10);
  return this.password_hash;
};

UserSchema.methods.validatePassword = function (rawPassword) {
  return bcrypt.compareSync(rawPassword, this.password_hash);
};

module.exports = mongoose.model('User', UserSchema);
