const mongodb = require('mongodb');

let _db;

const db = {
    connect: (url, name, options) =>
        mongodb.MongoClient.connect(url).then(client => {
            _db = client.db(name);
            db.users = _db.collection('users');
        }),

    get: () => _db
}

module.exports = db;