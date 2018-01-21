'use strict';

const router = require('express').Router(),
    user = require('./controllers/user');

router.route('/user')
    .get(user.get)
    .post(user.add)
    .delete(user.delete);

router.route('/settings')
    .get(user.settings.get)
    .post(user.settings.set);

router.route('/results')
    .get(user.results.get)
    .post(user.results.add);

router.route('/rating')
    .get(user.rating);


module.exports = router;