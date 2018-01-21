const MongoClient = require('mongodb').MongoClient,
    config = require('../config'),
    data = require('./data');

MongoClient.connect(config.db.url)
    .then(client => {
        this.client = client;
        return this.client.db(config.db.name).dropDatabase();
    })
    .then(() => {
        this.db = this.client.db(config.db.name);
        return this.db.createCollection('users', { validator: { $jsonSchema: { required: ["name", "uuid", "record", "results"] } } });
    })
    .then(() => {
        this.users = this.db.collection('users');
        return this.users.ensureIndex({ name: 1, record: 1 });
    })
    .then(() => this.users.ensureIndex({ uuid: 1 }, { unique: true }))
    .then(() => this.users.insertMany(data))
    .then(() => {
        this.client.close();
        console.info(`Mongodb: database "${config.db.name}" created with collection "users".`);
    })
    .catch(err => {
        console.error(err.message);
        process.exit();
    });