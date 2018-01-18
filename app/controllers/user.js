const user = require('../models/user');

let token;

function isToken(token) {
    return require('mongodb').ObjectID.isValid(token) ? token : false;
}

const controller = {
    get: (req, res) => {
        if (!isToken(req.headers.token))
            return res.status(403).send('No token received.');

        user(req.headers.token).get().then(
            result => {
                if (!result) res.status(403).send();
                else res.json(result);
            },
            err => {
                console.error(err);
                res.status(500).send();
            }
        );
    },
    add: (req, res) => {
        if (req.body.uuid) {
            user().add(req.body.uuid).then(
                result => {
                    console.log(result);
                    if (result.result.n) res.json({ token: result.ops[0]._id });
                    else res.status(500).send();
                },
                err => {
                    if (err.code == 11000) {
                        res.status(400).send("Already exist.");
                    } else {
                        console.error(err);
                        res.status(500).send();
                    }
                }
            );
        } else {
            res.status(400).send();
        }
    },

    delete: (req, res) => {
        if (!isToken(req.headers.token))
            return res.status(403).send('No token received.');

        user(req.headers.token).delete().then(
            result => {
                console.log(result);
                return result ? res.send() : res.status(400).send();
            },
            err => {
                console.error(err);
                res.status(500).send();;
            }
        );
    },

    settings: {
        get: (req, res) => {
            if (!isToken(req.headers.token))
                return res.status(403).send('No token received.');

            user(req.headers.token).settings.get().then(
                result => {
                    res.json(result.settings);
                },
                err => {
                    console.error(err);
                    res.status(500).send();;
                }
            );
        },

        set: (req, res) => {
            if (!isToken(req.headers.token))
                return res.status(403).send('No token received.');

            user(req.headers.token).settings.set(req.body).then(
                result => {
                    console.log(result);
                    if (result.result.nModified) res.send();
                    else res.status(400).send('Not modified');
                },
                err => {
                    console.error(err);
                    res.status(500).send();;
                }
            );
        }
    },

    results: {
        get: (req, res) => {
            if (!isToken(req.headers.token))
                return res.status(403).send('No token received.');

            user(req.headers.token).results.get().then(
                result => {
                    res.json(result);
                },
                err => {
                    console.error(err);
                    res.status(500).send();;
                }
            );
        },

        add: (req, res) => {
            if (!isToken(req.headers.token))
                return res.status(403).send('No token received.');
            else if (!req.body.result)
                return res.status(400).send('No result recieved.');

            user(req.headers.token).results.add(req.body.result).then(
                result => {
                    if (!result.result.nModified) res.status(500).send();
                    else res.status(200).send();
                },
                err => {
                    console.error(err);
                    res.status(500).send();;
                }
            );
        }
    },
    
    rating: (req, res) => {
        if (!isToken(req.headers.token))
            return res.status(403).send('No token received.');

        const [better, worse] = [req.body.better || 4, req.body.worse || 0];
        user(req.headers.token).rating(better, worse).then(
            result => {
                res.json(result);
            },
            err => {
                console.error(err);
                res.status(500).send();;
            });
    }
}

module.exports = controller;