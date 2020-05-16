const User = require('../models/User');
const Uploader = require('../config/cloudinary');

module.exports = {
  async registerUser(req, res) {
    let avatarUrl = null;
    let avatarID = null;
    if (req.file) {
      const { url, public_id } = await Uploader.uploadImage(req.file.path);
      avatarUrl = url;
      avatarID = public_id;
    }

    const user = new User(req.body);
    user.hashPassword(req.body.password);
    user.avatar = avatarUrl;
    user
      .save()
      .then(result => {
        res.json({ user: result });
      })
      .catch(err => {
        // Destroy if saving failed
        if (avatarID) {
          Uploader.destroyImage(avatarID);
        }
        // Return error for client
        res.json({
          err: err.keyValue,
          message: err.errmsg,
        });
      });
  },
  loginUser(req, res) {
    if (req.isAuthenticated()) {
      req.session.method = 'email';
      const { ban_expired_at, is_banned } = req.user;
      // Send 403 for banned user
      if (is_banned && ban_expired_at > new Date()) {
        req.logOut();
        return res.status(403).json({
          message: 'Your account has been banned by admin',
          ban_expired_at,
        });
      }
      // Unban if ban date passed
      if (is_banned) {
        unbanUser(req.user._id);
      }
      return res.status(200).json({ isAuthenticated: true, user: req.user });
    }
  },
  logoutUser(req, res) {
    req.logOut();
    res.end();
  },
  checkUser(req, res) {
    res.json({
      isAuthenticated: req.isAuthenticated(),
    });
  },
  updateStatus(req, res) {
    const id = req.user._id;
    const { status } = req.body;
    User.findByIdAndUpdate(id, { status }, { new: true })
      .select('status')
      .then(user => {
        res.json({ user });
      })
      .catch(err => res.status(400).json({ err }));
  },
  updatePassword(req, res) {
    if (req.body.password.length < 4) {
      return res
        .status(400)
        .json({ err: 'Password must be at least 4 characters' });
    }
    const id = req.user._id;
    const password_hash = new User().hashPassword(req.body.password);
    User.findByIdAndUpdate(id, { password_hash })
      .select('password_hash')
      .then(user => {
        res.json({ success: true, message: 'Password updated successfully!' });
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  checkAndUpdatePassword(req, res) {
    const { oldPassword, password } = req.body;
    const user_id = req.user._id;
    User.findById(user_id)
      .select('password_hash')
      .then(user => {
        if (user.validatePassword(oldPassword)) {
          module.exports.updatePassword(req, res);
        } else {
          return res.status(403).json({ err: 'Old password does not match' });
        }
      })
      .catch(err => res.status(400).json({ err: err.toString() }));
  },
  async updateAvatar(req, res) {
    const id = req.user._id;
    let avatar = null;
    if (req.file) {
      const { url } = await Uploader.uploadImage(req.file.path);
      avatar = url;
    }
    User.findByIdAndUpdate(id, { avatar }, { new: true })
      .then(user => {
        res.json({ user });
      })
      .catch(err => res.status(400).json({ err }));
  },
  updateInfo(req, res) {
    const id = req.user._id;
    User.findByIdAndUpdate(
      id,
      {
        display_name: req.body.displayName || undefined,
        gender: req.body.gender || undefined,
        address: req.body.address || undefined,
      },
      { new: true }
    )
      .then(user => {
        res.json({ user });
      })
      .catch(err => res.status(400).json({ err }));
  },
};

function unbanUser(user_id) {
  User.findByIdAndUpdate(user_id, {
    is_banned: false,
    ban_expired_at: null,
  })
    .then(() => {
      console.log('Unbaned user', user_id);
    })
    .catch(err => res.status(400).json({ err }));
}
