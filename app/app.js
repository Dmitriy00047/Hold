'use strict';

const
	express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	config = require('./config').server,
	api = require('./api'),
	app = express();

app
	.use(logger('dev'))
	.use(bodyParser.json())
	.use('/api', api);

const server = app.listen(config.port, () => {
	console.info(`Started on port ${server.address().port}`);
});

server.on('error', (e) => {
	console.error(`ERROR: Server started with error code ${e.code}.`)
});
