const express = require("express");
const router = express.Router();
const pacienteRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');

//middlewares
router.use('/pacientes', verifyApiHeaderToken, pacienteRoutes);
router.use('/expedientes', expedientesRoutes);


module.exports = router;