const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('fb-login', {
    display: 'dialog',
    scope: ['email', 'public_profile', 'user_location', 'user_gender'],
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('fb-login', {
    display: 'dialog',
    successRedirect: process.env.CLIENT_DOMAIN,
    failureFlash: true,
  }),
  (req, res) => {
    req.session.method = 'fb';
    res.end();
  }
);

router.all('/check', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

module.exports = router;
