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
      res.json({ err });
    });
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  }
});

router.post('/logout', (req, res) => {
  req.logOut();
  res.end();
});

module.exports = router;
