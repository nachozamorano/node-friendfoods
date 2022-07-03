const express = require('express');

const router = express.Router();

router
.use('/restaurant', require('./restaurant'))
.use('/tipoplato', require('./tipoplato'));

module.exports = router;