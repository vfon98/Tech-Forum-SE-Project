const express = require('express');
const router = express.Router();
const RoomControllers = require('../controllers/roomController');

router.get('/', RoomControllers.getAllRoom);
router.get('/:name', RoomControllers.getRoomByName);

module.exports = router;
