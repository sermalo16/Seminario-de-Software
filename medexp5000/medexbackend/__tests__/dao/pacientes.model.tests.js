const Pacientes = require('../../dao/pacientes/pacientes.model');

describe('Testing Pacientes Model', () => {
    let pacientesModel = undefined;
    beforeAll(() => {
        return pacientesModel = new Pacientes();
    });

    it('pacinetesModel Esta Definido ', () => {
        return expect(pacientesModel).toBeDefined();
    });


    it('getAll Devuelve un array', async() => {
        const arrPacientes = await pacientesModel.getAll();
        return expect(arrPacientes.length).toBeGreaterThanOrEqual(0);
    });
});