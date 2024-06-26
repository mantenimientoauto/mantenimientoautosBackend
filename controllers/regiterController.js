const Mantenimiento = require("../models/registros");

async function getAllRegiters(req, res){
    try {
        const registers = await Mantenimiento.findAll();
        res.status(200).json(registers);
    } catch (error) {
        console.error('Error al obtener los registros de mantenimiento:', error);
        res.status(500).json({ error: 'Error al obtener los registros de mantenimiento' });
    }
}

async function getAllRegistersByPlaca(req, res) {
    const { placa } = req.params;

    try {
        const registers = await Mantenimiento.findAll({
            where: {
                vehiculo_placa: placa
            }
        });

        if (registers.length > 0) {
            res.status(200).json(registers);
        } else {
            res.status(404).json({ message: `No se encontraron registros para la placa ${placa}` });
        }
    } catch (error) {
        console.error(`Error al obtener los registros para la placa ${placa}:`, error);
        res.status(500).json({ error: `Error al obtener los registros para la placa ${placa}` });
    }
}

async function addRegister(req, res){
    const { detalles, vehiculo_placa, usuario_nit, estado, sugerencia, url_before, url_after,nombre, nom_tecnico } = req.body;

    try {
        const nuevoMantenimiento = await Mantenimiento.create({
            detalles,
            vehiculo_placa,
            usuario_nit,
            estado,
            sugerencia,
            url_before,
            url_after,
            nombre,
            nom_tecnico
        });
        res.status(201).json(nuevoMantenimiento);
    } catch (error) {
        console.error('Error al agregar el registro de mantenimiento:', error);
        res.status(500).json({ error: 'No se pudo agregar el registro de mantenimiento' });
    }
}


async function deleteRegisterById(req, res){
    try {
        const { id } = req.params; // Obtiene el id desde los parámetros de la URL

        // Busca el registro por el id y elimínalo
        const resultado = await Mantenimiento.destroy({
            where: { id }
        });

        if (resultado) {
            res.status(200).json({ mensaje: `Registro con id ${id} eliminado exitosamente` });
        } else {
            res.status(404).json({ mensaje: `Registro con id ${id} no encontrado` });
        }
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    }
}

async function updateRegisterState(req, res) {
    const { id } = req.params;
    try {
        const register = await Mantenimiento.findByPk(id);
        if (register) {
            register.estado = true;
            await register.save();
            res.status(200).json(register);
        } else {
            res.status(404).json({ message: `Registro con id ${id} no encontrado` });
        }
    } catch (error) {
        console.error('Error al actualizar el estado del registro:', error);
        res.status(500).json({ error: 'No se pudo actualizar el estado del registro' });
    }
}

module.exports = {
    getAllRegiters,
    getAllRegistersByPlaca,
    addRegister,
    deleteRegisterById,
    updateRegisterState
};
