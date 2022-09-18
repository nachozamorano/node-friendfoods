const express = require('express');

const router = express.Router();

router
.use('/restaurant', require('./restaurant'))
.use('/tipoplato', require('./tipoplato'))
.use('/mesas', require('./mesas'));

module.exports = router;