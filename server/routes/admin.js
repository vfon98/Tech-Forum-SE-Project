const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/dashboard', adminControllers.getDashboard);
router.get('/users', adminControllers.allUsers);
router.get('/users/banned', adminControllers.getBannedUsers);
router.post('/ban/user', adminControllers.banUser);
router.post('/unban/user', adminControllers.unbanUser);

module.exports = router;
