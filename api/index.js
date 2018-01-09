'use strict';

const router = require('express').Router(),
    user = require('./user'),
    results = require('./results'),
    settings = require('./settings'),
    ratings = require('./ratings'),
    path = require('path');

router.use('/user', user)
    .use('/results', results)
    .use('/settings', settings)
    .use('/ratings', ratings);

router.get('/', function (req, res) {
    res.sendFile( path.resolve(__dirname + '\\..\\README.md') );
});


module.exports = router;
