module.exports = (app) => {
    const router = require('express').Router();
    const ordenesController = require('../controllers/ordenes.controller');

    router.get('/', ordenesController.getOrdenes);
    router.post('/', ordenesController.createOrden);
    router.post('/:id/comprobante', ordenesController.uploadComprobante);

    app.use('/ordenes', router);
};
