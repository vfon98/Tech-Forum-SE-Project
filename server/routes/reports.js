const express = require('express');
const router = express.Router();
const ReportControllers = require('../controllers/reportControllers');

router.get('/', ReportControllers.getAllReport);
router.post('/', ReportControllers.createReport);
router.delete('/:id', ReportControllers.deleteReport);

module.exports = router;
