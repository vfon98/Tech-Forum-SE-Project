const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('fb-login', {
    scope: ['email', 'user_gender'],
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
    res.json({ fbLogin: 'ok', user: req.user });
  }
);

module.exports = router;
