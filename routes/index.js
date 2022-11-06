const express = require('express');

const router = express.Router();

router
.use('/restaurant', require('./restaurant'))
.use('/tipoplato', require('./tipoplato'))
.use('/mesas', require('./mesas'))
.use('/estadomesa', require('./estadomesa'))
.use('/estadoorden', require('./estadoorden'));

module.exports = router;