const Profile = require('../models/Profile');
const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getProfile(req, res) {
    Profile.findOne({ user_id: req.user._id })
      .populate('user_id')
      .then(profile => {
        res.status(200).json({ profile });
      })
      .catch(err => res.status(400).json({ err }));
  },
  updateProfile(req, res) {
    const user_id = req.user._id;
    const body = {
      // Overview
      'overview.education': req.body.educations,
      'overview.live_at': req.body.liveAt,
      'overview.hometown': req.body.hometown,
      // Contact
      'contact.phone': req.body.phone,
      'contact.email': req.body.emails,
      'contact.website': req.body.website,
      // Socials
      'socials.facebook': req.body.facebook,
      'socials.instagram': req.body.instagram,
      'socials.twitter': req.body.twitter,
      'socials.github': req.body.github,
      'socials.others': req.body.others,
    };

    // Remove undefined values
    Object.entries(body).forEach(([key, value], index) => {
      if (value === undefined) {
        delete body[key];
      }
    });

    Profile.findOneAndUpdate({ user_id }, body, {
      upsert: true,
      new: true,
    })
      .populate('user_id')
      .then(profile => {
        res.json({
          status: 'ok',
          profile,
        });
      })
      .catch(err =>
        res.status(400).json({ message: 'Update profile failed', err })
      );
  },
  getProfileById(req, res) {
    const user_id = req.params.id;
    User.findById(user_id)
      .populate({
        path: 'profile',
      })
      .populate({ path: 'news posts', select: '-comments' })
      .then(user => {
        res.json({ user });
      })
      .catch(err => console.log({ err }));
  },
};
