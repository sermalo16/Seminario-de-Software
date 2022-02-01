const getDb = require('../db');
let db = null;

class Expedientes {

    constructor() {
        getDb()
            .then((database) => {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, descripcion TEXT, observacion TEXT, registros TEXT, ultimoActualizacion DATE);';
                    db.run(createStatement);
                }
            })
            .catch((err) => { console.error(err) });
    }

    new(identidad, descripcion, observacion, registros, ultimoActualizacion) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO expedientes (identidad, descripcion, observacion, registros, ultimoActualizacion) VALUES (?, ?, ?, ?, ?);', [identidad, descripcion, observacion, registros, ultimoActualizacion],
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
            db.all('SELECT * from expedientes;', (err, rows) => {
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
                'SELECT * from expedientes where id=?;', [id],
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

    updateONE(id, identidad, descripcion, observacion, registros, ultimoActualizacion) {
        return new Promise((accept, reject) => {
            const sqlUpdate = 'UPDATE expedientes set identidad = ?, descripcion = ?, observacion = ?, registros = ?, ultimoActualizacion = ? where id = ?;';
            db.run(
                sqlUpdate, [identidad, descripcion, observacion, registros, ultimoActualizacion, id],
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
            const sqlUpdate = 'DELETE FROM expedientes where id = ?;';
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


module.exports = Expedientes;