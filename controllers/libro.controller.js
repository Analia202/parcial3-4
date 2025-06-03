// controllers/libro.controller.js
const axios = require('axios');

exports.getLibros = (req, res) => {
    axios.get('http://localhost:8000/api/books/')
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener libros' }));
};

exports.getTopLibros = (req, res) => {
    axios.get('http://localhost:8000/api/books/top/')
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener top libros' }));
};

exports.getLibroById = (req, res) => {
    axios.get(`http://localhost:8000/api/books/${req.params.id}/`)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener libro' }));
};
