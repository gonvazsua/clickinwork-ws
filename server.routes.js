const authRoutes = require('./src/authentication/authentication.controller');
const tokenService = require('./src/config/token/token');
const timeControlRoutes = require('./src/time-control/time-control.controller');

exports.addRoutes = expressApp => {

    expressApp.use('/auth', authRoutes);
    expressApp.use('/timeControl', timeControlRoutes);

    expressApp.use(tokenService.verifyToken);

};