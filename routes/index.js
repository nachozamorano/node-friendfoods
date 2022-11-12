const express = require('express');

const router = express.Router();

router
.use('/restaurant', require('./restaurant'))
.use('/tipoPlato', require('./tipoPlato'))
.use('/mesa', require('./mesa'))
.use('/orden', require('./orden'));

module.exports = router;