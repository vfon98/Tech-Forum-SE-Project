const express = require('express');
const router = express.Router();
const RoomControllers = require('../controllers/roomController');

router.get('/', RoomControllers.getAllRoom);

module.exports = router;
