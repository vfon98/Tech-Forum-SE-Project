const express = require('express');
const router = express.Router();
const ReportControllers = require('../controllers/reportControllers');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', ReportControllers.getAllReport);
router.post('/', ReportControllers.createReport);

router.use(requireAdmin);
router.delete('/:id', ReportControllers.deleteReport);

module.exports = router;
