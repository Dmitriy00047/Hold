'use strict';

var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('GET user');
});

router.post('/', (req, res) => {
    res.send('POST user');
});

router.delete('/', (req, res) => {
    res.send('DELETE user');
});


module.exports = router;