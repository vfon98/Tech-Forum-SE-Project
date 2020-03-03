const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserControllers = require('../controllers/userController');
const User = require('../models/User');
const authenticate = require('../middlewares/authenticate');

router.post('/register', (req, res) => {
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
});

router.post(
  '/login',
  passport.authenticate('local-login', {
    failureFlash: true,
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      req.session.method = 'email';
      res.json({ isAuthenticated: true, user: req.user });
    }
  }
);

router.post('/logout', (req, res) => {
  req.logOut();
  res.end();
});

// Just for testing
router.all('/check', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
  });
});

module.exports = router;
