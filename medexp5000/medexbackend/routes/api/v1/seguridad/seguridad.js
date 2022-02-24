const express = require('express');
const router = express.Router();
const Usuarios = require('../../../../dao/usuarios/usuario.model');
const jwt = require('jsonwebtoken');
const UsuariosModel = new Usuarios();


router.post('/signin', async(req, res) => {
    try {
        const { email, password } = req.body;
        //TODO: realizar validacion de entrada de datos
        let rslt = await UsuariosModel.new(email, password);
        res.status(200).json({ status: 'succes', result: rslt });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }

});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        //TODO: realizar validacion de entrada de datos
        let userInDb = await UsuariosModel.getByEmail(email);
        if (userInDb) {
            const isPasswordValid = await UsuariosModel.comparePassword(password, userInDb.password);
            if (isPasswordValid) {
                const { email, roles, _id } = userInDb;
                const payload = {
                    jwt: jwt.sign({ email, roles, _id }, process.env.JWT_SECRET),
                    user: { email, roles, _id }
                }
                res.status(200).json(payload);
            } else {
                res.status(400).json({ status: 'failed', error: 2 });
            }
        } else {
            res.status(400).json({ status: 'failed', error: 1 });
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

module.exports = router;