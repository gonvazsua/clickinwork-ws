const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const tokenService = require('../config/token/token');

router.get('/:id', (req, res) => {
    console.log("[USERS] /id");
    userService.findOne({'_id': req.params.id})
        .then(user => res.jsonp(user))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Error buscando usuario por ID');
        });
});

router.get('/logged', (req, res) => {
    console.log("[USERS] /logged");
    tokenService
        .getUserDataFromRequest(req)
        .then(payload => userService.findOne({'_id': payload.user_id}))
        .then(user => res.jsonp(user))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Error buscando usuario logado');
        });
});



module.exports = router;