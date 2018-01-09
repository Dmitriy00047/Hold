'use strict';

var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('GET results');
});

router.post('/', (req, res) => {
    res.send('POST results');
});

module.exports = router;