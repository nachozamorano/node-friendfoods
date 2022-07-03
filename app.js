const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors');
const env = require('./env');

const routes = require('./routes/index');

const app = express();
app
    .use(cors())
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/api', routes)
    .listen(env.port, () => console.log ('Server listening on port ' + env.port));