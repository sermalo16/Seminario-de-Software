const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    });
}); //get


router.post('/new', async(req, res) => {
    const { identidad, descripcion, observacion, registros, ultimoActualizacion } = req.body;

    res.status(200).json({
        status: 'ok',
        recieved: {
            identidad,
            fecha: new Date().toISOString(),
            descripcion,
            observacion,
            registros,
            ultimoActualizacion
        }
    });

}); //post


module.exports = router;