const axios = require('axios');

exports.getOrdenes = (req, res) => {
    axios.get('http://localhost:8000/api/orders/', {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al obtener ordenes' }));
};

exports.createOrden = (req, res) => {
    axios.post('http://localhost:8000/api/orders/', req.body, {

    })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Error al crear orden' }));
};

exports.uploadComprobante = (req, res) => {
    axios.post(`http://localhost:8000/api/orders/${req.params.id}/upload-proof/`, req.body, {
    })
        .then(response => res.json({ message: 'Comprobante subido' }))
        .catch(error => res.status(500).json({ error: 'Error al subir comprobante' }));
};
