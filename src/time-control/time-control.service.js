const eventType = require('./event-type.enum');
const dbConfig = require('../config/db-config');
const status = require('./time-control-status.enum');
const dateParser = require('../parsers/date-parser');

exports.checkin = user => {
    return new Promise((resolve, reject) => {
        this.emptyTimeControl(user)
            .then(this.addStartEvent)
            .then(this.saveTimeControl)
            .then(tc => resolve(tc))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

exports.emptyTimeControl = user => {
    return new Promise((resolve, reject) => {
        const timeControl = {
            status : status.OPEN,
            user_id : user.user_id,
            creation_date : dateParser.toISOdate(new Date()),
            time_events : []
        };
        resolve(timeControl);
    });
};

exports.addStartEvent = timeControl => {
    return new Promise((resolve, reject) => {
        const tc = Object.assign({}, timeControl);
        const startEvent = {
            type : eventType.START,
            time : dateParser.toISOdate(new Date())
        }
        tc.time_events.push(startEvent);
        resolve(tc);
    });
};


exports.addPauseEvent = timeControl => {
    return new Promise((resolve, reject) => {
        const tc = Object.assign({}, timeControl);
        const pauseEvent = {
            type : eventType.PAUSE,
            time : dateParser.toISOdate(new Date())
        }
        tc.time_events.push(pauseEvent);
        resolve(tc);
    });
};

exports.addContinueEvent = timeControl => {
    return new Promise((resolve, reject) => {
        const tc = Object.assign({}, timeControl);
        const pauseEvent = {
            type : eventType.CONTINUE,
            time : dateParser.toISOdate(new Date())
        }
        tc.time_events.push(pauseEvent);
        resolve(tc);
    });
};

exports.saveTimeControl = timeControl => {
    return new Promise((resolve, reject) => {
        dbConfig
            .getDatabaseConn()
            .then(db => {
                db.collection(dbConfig.TIME_CONTROL).save(timeControl, (err, tc) => {
                    if(err) reject("Error al guardar el fichaje");
                    else {
                        resolve(timeControl);
                    }
                });
            });

    });
};

exports.loadCurrentTimeControl = user => {
    return new Promise((resolve, reject) => {
        dbConfig.getDatabaseConn().then(db => {
            const today = new Date();
            const from = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const to =  new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            const fromISO = dateParser.toISOdate(from);
            const toISO = dateParser.toISOdate(to);
            db.collection(dbConfig.TIME_CONTROL).findOne({user_id: user.user_id, creation_date: {$gte: fromISO, $lte: toISO}}, (err, tc) => {
                if(err || !tc) {
                    this.emptyTimeControl(user).then(timeControl => resolve(timeControl));
                } else {
                    resolve(tc);
                }
            });
        });
    });
};

exports.pauseTimeControl = user => {
    return new Promise((resolve, reject) => {
        this.loadCurrentTimeControl(user)
            .then(this.addPauseEvent)
            .then(this.saveTimeControl)
            .then(tc => resolve(tc))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};

exports.continueTimeControl = user => {
    return new Promise((resolve, reject) => {
        this.loadCurrentTimeControl(user)
            .then(this.addContinueEvent)
            .then(this.saveTimeControl)
            .then(tc => resolve(tc))
            .catch(err => {
                console.log(err);
                reject(err);
            })
    });
};

exports.finishTimeControl = user => {
    return new Promise((resolve, reject) => {
        this.loadCurrentTimeControl(user)
            .then(this.addStopEvent)
            .then(this.setClosedStatus)
            .then(this.saveTimeControl)
            .then(tc => resolve(tc))
            .catch(err => {
                console.log(err);
                reject(err);
            })
    });
};

exports.addStopEvent = timeControl => {
    return new Promise((resolve, reject) => {
        const tc = Object.assign({}, timeControl);
        const stopEvent = {
            type : eventType.STOP,
            time : dateParser.toISOdate(new Date())
        }
        tc.time_events.push(stopEvent);
        resolve(tc);
    });
};

exports.setClosedStatus = timeControl => {
    return new Promise((resolve, reject) => {
        const tc = Object.assign({}, timeControl);
        tc.status = status.CLOSED;
        resolve(tc);
    });
};

exports.getLastTimeControls = user => {
    return new Promise((resolve, reject) => {
        dbConfig.getDatabaseConn().then(db => {
            db.collection(dbConfig.TIME_CONTROL)
                .find({user_id: user.user_id, status: status.CLOSED})
                .sort({creation_date: -1})
                .limit(7)
                .toArray((err, res) => {
                    resolve(res);
                });
        });
    });
};