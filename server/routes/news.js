const express = require('express');
const router = express.Router();
const newsControllers = require('../controllers/newsController');

router.get('/all', newsControllers.allNews);
router.get('/random', newsControllers.randomNews);
router.get('/recent', newsControllers.getRecentNews);
router.get('/room/:name', newsControllers.getNewsByRoom);
router.get('/:id', newsControllers.getNews);

module.exports = router;
