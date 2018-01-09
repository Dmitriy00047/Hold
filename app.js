'use strict';

const app = require('express')(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	routes = require('./api');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

const server = app.listen(3000, 
	() => console.info(`Server starts on port ${server.address().port}`)
);
