const db = require('../db'),
    mongo = require('mongodb'),
    ObjectID = mongo.ObjectID;

const model = function (id) {
    let query = { _id: ObjectID(id) };
    let options = {
        projection: {
            _id: false
        }
    };
    
    return {
        get: () => {
            options.projection.name = options.projection.record = true;
            return db.users.findOne(query, options);
        },

        add: (uuid) => db.users.insertOne(
            {
                uuid: uuid,
                name: null,
                record: 0,
                results: [],
                settings: {}
            }
        ),

        delete: () => db.users.deleteOne(query),

        settings: {
            set: (settings) => {
                let document = { $set: { settings: settings }};
                if (settings.name) {
                    document.$set.name = settings.name ;
                    delete settings.name;
                }

                return db.users.updateOne(query, document);
            },

            get: () => {
                options.projection.settings = true;
                return db.users.findOne(query, options);
            }
        },

        results: {
            add: (result) => {
                options.projection.record = true;
                return db.users.findOne(query, options)
                    .then(doc => doc.record)
                    .then(record => {
                        let document = { $push: { results: result } };
                        if (result > record) document.$set = { record: result };

                        return db.users.updateOne(query, document);
                    });
            },

            get: () => {
                options.projection.results = true;
                return db.users.findOne(query, options);
            }
        },

        rating: (better = 0, worse = 0) => {
            options.projection.name = options.projection.record = true;
            return db.users
                .findOne(query, options)
                .then(doc => {
                    let result = {};
                    return db.users
                        .find({ record: { $gt: doc.record } })
                        .project(options.projection).sort({ record: -1 })
                        .limit(better)
                        .toArray()
                        .then(docs => {
                            if (docs) result.better = docs;

                            if (worse) {
                                db.users
                                    .find({ record: { $lt: doc.record } })
                                    .project(options.projection).sort({ record: 1 })
                                    .limit(worse)
                                    .toArray().then(docs => {
                                        if (docs) result.worse = docs;
                                    });
                            } else return result;
                        });
                });

        }

    }
}

module.exports = model;
