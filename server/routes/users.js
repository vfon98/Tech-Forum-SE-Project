const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserControllers = require('../controllers/userController');
const User = require('../models/User');

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
  console.log(req.user)
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: JSON.stringify(req.user),
    // session: JSON.stringify(req.session.passport.user)
  });
});

module.exports = router;
