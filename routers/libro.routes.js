module.exports = (app) => {
    const router = require('express').Router();
    const libroController = require('../controllers/libro.controller');

    router.get('/', libroController.getLibros);
    router.get('/top', libroController.getTopLibros);
    router.get('/:id', libroController.getLibroById);

    app.use('/libros', router);
};
