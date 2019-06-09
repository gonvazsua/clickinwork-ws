const express = require('express');
const router = express.Router();
const authService = require('./authentication.service');
const tokenService = require('../config/token/token');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    authService
        .authenticate(email, password)
        .then(tokenService.generateToken)
        .then(token => { res.jsonp({'token' : token}) })
        .catch(err => {
            res.status(403);
            res.send('Login incorrecto');
        })
});

router.post('/updatePassword', (req, res) => {
    console.log("[AUTH] /updatePassword");
    tokenService
        .getUserDataFromRequest(req)
        .then(payload => authService.updatePassword(payload.user_id, req.body.oldPassword, req.body.newPassword))
        .then(user => res.jsonp(user))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Error actualizando contrasena');
        });
});

/** AUX METHOD */
router.get('/generatePassword', (req, res) => {
    const password = req.query['password'];
    const codedPassword = authService.generatePassword(password);
    console.log(codedPassword);
    res.jsonp({'password': codedPassword});
});

module.exports = router;