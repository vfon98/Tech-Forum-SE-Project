const User = require('../models/User');

module.exports = {
  registerUser(req, res) {
    const user = new User(req.body);
    user.hashPassword(req.body.password);
    user
      .save()
      .then(result => {
        res.json({ user: result });
      })
      .catch(err => {
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
