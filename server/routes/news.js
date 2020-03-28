const express = require('express');
const router = express.Router();
const newsControllers = require('../controllers/newsController');

router.get('/', newsControllers.allNews);
router.get('/:id', newsControllers.getNews);

module.exports = router;
