'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	api = require('./api'),
	app = express();

app
	.use(logger('dev'))
	.use(bodyParser.json())
	.use('/api', api);

module.exports = app;