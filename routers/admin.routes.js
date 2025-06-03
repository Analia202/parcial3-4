module.exports = (app) => {
    const router = require('express').Router();
    const adminController = require('../controllers/admin.controller');

    // Libros
    router.post('/libros', adminController.createLibro);
    router.put('/libros/:id', adminController.updateLibro);
    router.delete('/libros/:id', adminController.deleteLibro);

    // Géneros
    router.put('/generos/:id', adminController.updateGenero);
    router.delete('/generos/:id', adminController.deleteGenero);

    // Usuarios
    router.get('/usuarios', adminController.getUsuarios);

    // Ventas
    router.get('/ventas', adminController.getVentas);

    app.use('/admin', router);
};
