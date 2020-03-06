const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const ProfileController = require('../controllers/profileController');

router.use(authenticate);

router.get('/', ProfileController.getProfile);
router.put('/', ProfileController.updateProfile);

module.exports = router;
