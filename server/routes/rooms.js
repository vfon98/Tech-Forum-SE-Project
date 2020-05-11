const express = require('express');
const router = express.Router();
const RoomControllers = require('../controllers/roomController');
const upload = require('../middlewares/uploadFile');

router.get('/', RoomControllers.getAllRoom);
router.get('/:name', RoomControllers.getRoomByName);
router.post('/', upload.single('thumbnail'), RoomControllers.createRoom);
router.post('/hide', RoomControllers.hideRoom);
router.post('/active', RoomControllers.activeRoom);

module.exports = router;
