const express = require('express');
const req = require('express/lib/request');
const router = express.Router();


const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedientesModel = new Expedientes();


router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    });
}); //get


router.get('/all', async(req, res) => {
    try {
        const rows = await expedientesModel.getAll();
        res.status(200).json({ status: 'ok', expedientes: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
}); //all

router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await expedientesModel.getById(parseInt(id));
        res.status(200).json({ status: 'ok', paciente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
}); //get by id

/*
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
*/

router.post('/new', async(req, res) => {
    const { identidad, descripcion, observacion, registros } = req.body;
    try {
        rslt = await expedientesModel.new(identidad, descripcion, observacion, registros, new Date().toISOString());
        res.status(200).json({
            status: 'ok',
            result: rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            status: 'failed',
            result: {}
        });
    }
}); //POST /new


//router.put();
router.put('/update/:id', async(req, res) => {

    try {
        const { identidad, descripcion, observacion, registros } = req.body;
        const { id } = req.params;
        const result = await expedientesModel.updateONE(id, identidad, descripcion, observacion, registros, new Date().toISOString());
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
}); //router.put();


router.delete('/delete/:id', async(req, res) => {

    try {
        const { id } = req.params;
        const result = await expedientesModel.deleteONE(id);
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
}); //delete


module.exports = router;