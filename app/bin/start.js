const app = require('../app'),
    db = require('../db'),
    config = require('../config');

db.connect(config.db.url, config.db.name, config.db.options)
    .then(() => {
        console.info(`Database: ${config.db.url}`);

        app.listen(config.server.port)
            .on('listening', () => {
                console.info(`HTTP server: http://localhost:${config.server.port}`);
            })
            .on('error', (err) => {
                console.error(`Server started with error code ${err.code}.`);
                process.exit();
            });
    })
    .catch(err => {
        console.error(err.message);
        process.exit();
    });