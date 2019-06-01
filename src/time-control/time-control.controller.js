const express = require('express');
const router = express.Router();
const tokenSevice = require('../config/token/token');
const timeControlService = require('./time-control.service');


router.post('/start', (req, res) => {
    console.log("[FICHAJES] /start");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.checkin)
        .then(timeControl => res.jsonp(timeControl))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Fichaje no creado');
        });
});

router.get('/current', (req, res) => {
    console.log("[FICHAJES] /current");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.loadCurrentTimeControl)
        .then(tc => res.jsonp(tc))
        .catch(err => {
            console.error(err);
            res.status(404);
            res.send('Fichaje no encontrado');
        });
});

router.post('/pause', (req, res) => {
    console.log("[FICHAJES] /pause");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.pauseTimeControl)
        .then(tc => res.jsonp(tc))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Evento de PAUSE no creado');
        });
});

router.post('/continue', (req, res) => {
    console.log("[FICHAJES] /continue");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.continueTimeControl)
        .then(tc => res.jsonp(tc))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Evento de CONTINUE no creado');
        });
});

router.post('/finish', (req, res) => {
    console.log("[FICHAJES] /finish");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.finishTimeControl)
        .then(tc => res.jsonp(tc))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Evento de FINISH no creado');
        });
});

router.get('/last', (req, res) => {
    console.log("[FICHAJES] /last");
    tokenSevice
        .getUserDataFromRequest(req)
        .then(timeControlService.getLastTimeControls)
        .then(tc => res.jsonp(tc))
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send('Evento de FINISH no creado');
        });
});

module.exports = router;