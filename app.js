const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const env = require('./env');

const routes = require('./routes/index');

const app = express();
app
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/api', routes)
    .listen(env.port, () => console.log ('Server listening on port ' + env.port));