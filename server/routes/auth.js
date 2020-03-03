const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('fb-login', {
    display: 'popup',
    scope: ['email', 'public_profile', 'user_location', 'user_gender'],
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('fb-login', {
    display: 'popup',
    successRedirect: 'http://localhost:3000/',
    // failureFlash: true,
  }),
  (req, res) => {
    req.session.method = 'fb';
    console.log("FACEBOOK AUTH")
    res.end();
  }
);

router.all('/facebook/check', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated(), user: req.user, session: req.session });
});

module.exports = router;
