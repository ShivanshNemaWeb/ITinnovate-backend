const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');


router.post('/contactUs', contactController.sendEmail);

module.exports = router;
