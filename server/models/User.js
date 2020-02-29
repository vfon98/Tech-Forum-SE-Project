const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
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
    },
    display_name: {
      type: String,
      required: true,
      unique: true
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
  }
);

UserSchema.methods.hashPassword = function(rawPassword) {
  this.password_hash = bcrypt.hashSync(rawPassword, 10);
};

UserSchema.methods.validatePassword = function(rawPassword) {
  return bcrypt.compareSync(rawPassword, this.password_hash);
};

UserSchema.methods.createUser = user => {};

module.exports = mongoose.model('User', UserSchema);
