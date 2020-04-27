const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/dashboard', adminControllers.getDashboard);

module.exports = router;
