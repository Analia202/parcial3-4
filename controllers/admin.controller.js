const axios = require('axios');

// Libros
exports.createLibro = (req, res) => {
    axios.post('http://localhost:8000/api/admin/books/', req.body, {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al crear libro' }));
};

exports.updateLibro = (req, res) => {
    axios.put(`http://localhost:8000/api/books/${req.params.id}/`, req.body, {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al actualizar libro' }));
};

exports.deleteLibro = (req, res) => {
    axios.delete(`http://localhost:8000/api/books/${req.params.id}/`, {

    })
        .then(() => res.json({ message: 'Libro eliminado' }))
        .catch(error => res.status(500).json({ error: 'Error al eliminar libro' }));
};

// Géneros
exports.updateGenero = (req, res) => {
    axios.put(`http://localhost:8000/api/genres/${req.params.id}/`, req.body, {
    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al actualizar género' }));
};

exports.deleteGenero = (req, res) => {
    axios.delete(`http://localhost:8000/api/genres/${req.params.id}/`, {
    })
        .then(() => res.json({ message: 'Género eliminado' }))
        .catch(error => res.status(500).json({ error: 'Error al eliminar género' }));
};

// Usuarios
exports.getUsuarios = (req, res) => {
    axios.get('http://localhost:8000/api/users/', {
    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener usuarios' }));
};

// Ventas
exports.getVentas = (req, res) => {
    axios.get('http://localhost:8000/api/admin/sales/', {
    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener ventas' }));
};
