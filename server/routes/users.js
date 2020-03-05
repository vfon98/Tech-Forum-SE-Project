const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserControllers = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');

router.post('/register', upload.single('avatar'), UserControllers.registerUser);
router.post(
  '/login',
  passport.authenticate('local-login', {
    failureFlash: true,
  }),
  UserControllers.loginUser
);
router.post('/logout', UserControllers.logoutUser);

// Just for testing
router.all('/check', UserControllers.checkUser);

module.exports = router;
