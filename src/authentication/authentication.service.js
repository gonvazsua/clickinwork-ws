const crypto = require('crypto');
const dbConfig = require('../config/db-config');


exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        const codedPassword = this.generatePassword(password);
        console.log(codedPassword);
        dbConfig.getDatabaseConn().then(db => {
            db.collection(dbConfig.USERS).findOne({'email': email, 'password':codedPassword}, (err, user) => {
                if(err) {
                    console.log(err);
                    reject('Login incorrecto');
                } else {
                    resolve(user);
                }
            });
        });
    });
};

exports.generatePassword = password => {
    return crypto.createHash('md5').update(this.decodeBase64(password)).digest('hex');
};

exports.decodeBase64 = encoded => {
    return Buffer.from(encoded, 'base64').toString('ascii');
};