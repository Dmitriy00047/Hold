'use strict';

var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.send('GET settings');
});


router.post('/', function (req, res) {
    res.send('POST settings');
});



module.exports = router;