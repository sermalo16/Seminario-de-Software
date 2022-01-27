const getDb = require('../db');
let db = null;
class Pacientes {

    constructor() {
        getDb()
            .then((database) => {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
                    db.run(createStatement);
                }
            })
            .catch((err) => { console.error(err) });
    }

    new(nombres, apellidos, identidad, telefono, correo) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);', [identidad, nombres, apellidos, correo, telefono],
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

    getAll() {
        return new Promise((accept, reject) => {
            db.all('SELECT * from pacientes;', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(rows);
                }
            });
        });
    }

    getById(id) {
        return new Promise((accept, reject) => {
            db.get(
                'SELECT * from pacientes where id=?;', [id],
                (err, row) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        accept(row);
                    }
                });
        });
    }

    updateONE(id, nombres, apellidos, identidad, telefono, correo) {
        return new Promise((accept, reject) => {
            const sqlUpdate = 'UPDATE pacientes set nombre = ?, apellidos = ?, identidad = ?, telefono = ?, email = ? where id = ?;';
            db.run(
                sqlUpdate, [nombres, apellidos, identidad, telefono, correo, id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        accept(this);
                    }
                }
            );
        });
    }

    deleteONE(id) {
        return new Promise((accept, reject) => {
            const sqlUpdate = 'DELETE FROM pacientes where id = ?;';
            db.run(
                sqlUpdate, [id],
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        accept(this);
                    }
                }
            );
        });
    }


}

module.exports = Pacientes;