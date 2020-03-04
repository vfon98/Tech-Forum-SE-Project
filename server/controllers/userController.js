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
};
