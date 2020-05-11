const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserControllers = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const authenticate = require('../middlewares/authenticate');

router.post('/register', upload.single('avatar'), UserControllers.registerUser);
router.post(
  '/login',
  passport.authenticate('local-login', {
    failureFlash: true,
  }),
  UserControllers.loginUser
);

router.use(authenticate);
router.post('/logout', UserControllers.logoutUser);
router.put('/', UserControllers.updateInfo);
router.put('/status', UserControllers.updateStatus);
router.put('/password', UserControllers.updatePassword);
router.put('/avatar', upload.single('avatar'), UserControllers.updateAvatar);
// Just for testing
router.all('/check', UserControllers.checkUser);
router.all('/test', upload.single('upload'), UserControllers.test)

module.exports = router;
