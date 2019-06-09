const dbConfig = require('../config/db-config');

exports.findOne = query => {
    return new Promise((resolve, reject) => {
        dbConfig.getDatabaseConn()
            .then(db => {
                db.collection(dbConfig.USERS).findOne(dbConfig.buildParams(query), (err, user) => {
                    if(err) reject(err);
                    else resolve(user);
                });
            });
    });
};