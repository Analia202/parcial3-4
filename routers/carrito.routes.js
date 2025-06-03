module.exports = (app) => {
    const router = require('express').Router();
    const carritoController = require('../controllers/carrito.controller');

    router.get('/', carritoController.getCarrito);
    router.post('/', carritoController.addCarrito);
    router.delete('/:id', carritoController.deleteCarrito);

    app.use('/carrito', router);
};
