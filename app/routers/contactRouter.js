const express = require('express');

// on importe nos controllers
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/contact', contactController.contact);
router.post('/contact', contactController.contact);

module.exports = router;