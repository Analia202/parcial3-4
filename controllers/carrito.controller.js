const axios = require('axios');

exports.getCarrito = (req, res) => {
    axios.get('http://localhost:8000/api/cart/', {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener carrito' }));
};

exports.addCarrito = (req, res) => {
    axios.post('http://localhost:8000/api/cart/', req.body, {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al agregar al carrito' }));
};

exports.deleteCarrito = (req, res) => {
    axios.delete(`http://localhost:8000/api/cart/${req.params.id}/`, {

    })
        .then(() => res.json({ message: 'Libro eliminado del carrito' }))
        .catch(error => res.status(500).json({ error: 'Error al eliminar del carrito' }));
};

