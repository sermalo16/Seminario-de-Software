const express = require('express');
const router = express.Router();

const Pacientes = require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new pacienteModel();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Pacientes',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    });
}); //get

router.post('/new', async(req, res) => {
    const { nombres, apellidos, identidad, email, telefono } = req.body;
    rslt = await pacienteModel.new(nombres, apellidos, identidad, email, telefono);
    res.status(200).json({
        status: 'ok',
        recieved: {
            nombres,
            apellidos,
            nombreApellido: `${nombres} ${apellidos}`,
            identidad,
            email,
            telefono
        }
    });

}); //post
//router.put();
//router.delete();

module.exports = router;