const authRoutes = require('./src/authentication/authentication.controller');
const tokenService = require('./src/config/token/token');
const timeControlRoutes = require('./src/time-control/time-control.controller');
const usersRoutes = require('./src/users/user.controller');

exports.addRoutes = expressApp => {

    expressApp.use('/auth', authRoutes);
    expressApp.use(tokenService.verifyToken);
    expressApp.use('/timeControl', timeControlRoutes);
    expressApp.use('/users', usersRoutes);


};