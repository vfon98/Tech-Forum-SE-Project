const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const ProfileSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  },
  overview: {
    education: [{ type: String }],
    live_at: {
      type: String,
      default: null,
    },
    hometown: {
      type: String,
      default: null,
    },
  },
  contact: {
    phone: {
      type: String,
      default: null,
      validate: {
        validator: validator.isMobilePhone,
        message: '{VALUE} is not valid',
      },
    },
    email: [
      {
        type: String,
        validate: {
          validator: validator.isEmail,
          message: '{VALUE} is not valid',
        },
      },
    ],
    website: {
      type: String,
      default: null,
    },
  },
  socials: {
    facebook: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    github: {
      type: String,
      default: null,
    },
    others: [{ name: String, link: String }],
  },
});

ProfileSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id'
})

module.exports = mongoose.model('Profile', ProfileSchema);
