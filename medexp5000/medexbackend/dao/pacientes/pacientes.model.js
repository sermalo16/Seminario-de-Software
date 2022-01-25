const { accepts } = require('express/lib/request');
const db = require('../db');

class Pacientes {

    constructor() {
        if (process.env.MIGRATE === 'true') {
            const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTERGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombres TEXT, apellidos TEXT, email TEXT, telefono TEXT)';
            db.run(createStatement);
        }
    }

    new(nombres, apellidos, identidad, telefono, email) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes  (identidad, nombres, apellidos, email, telefono) values (?,?,?,?,?);', [identidad, nombres, apellidos, email, telefono],
                (err, rslt) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }
}

module.exports = Pacientes;