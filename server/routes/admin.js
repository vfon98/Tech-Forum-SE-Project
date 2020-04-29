const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/dashboard', adminControllers.getDashboard);
router.get('/users', adminControllers.allUsers);
router.get('/users/banned', adminControllers.getBannedUsers);

module.exports = router;
