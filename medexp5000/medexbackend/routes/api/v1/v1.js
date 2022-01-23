const express = require("express");
const router = express.Router();
const pacienteRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
//const expedientesRoutes = require('./expedientes/expedientes');

//middlewares
router.use('/pacientes', pacienteRoutes);
router.use('/expedientes', expedientesRoutes);


module.exports = router;