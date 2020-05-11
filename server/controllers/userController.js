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
      res.json({ isAuthenticated: true, user: req.user });
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
