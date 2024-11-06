import ordenTrabajoService from "../../services/operaciones/ordentrabajoService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createOrdenTrabajo = async (req, res) => {
    try {
        const data = req.body;
        const response = await ordenTrabajoService.createOrdenTrabajo(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getOrdenTrabajoById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordentrabajo = await ordenTrabajoService.getOrdenTrabajoById(id);
        if (!ordentrabajo) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        ResponseHandler.Ok(res, ordentrabajo)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getOrdenTrabajoByUserId = async (req, res) => {
    try {
        const { idUser } = req.params;
        const ordentrabajo = await ordenTrabajoService.getOrdenTrabajoByUserId(idUser);
        ResponseHandler.Ok(res, ordentrabajo)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getAllDataOrdenTrabajoByUserId = async (req, res) => {
    try {
        const { idUser } = req.params;
        const ordentrabajo = await ordenTrabajoService.getAllDataOrdenTrabajoByUserId(idUser);
        ResponseHandler.Ok(res, ordentrabajo)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateOrdenTrabajo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await ordenTrabajoService.updateOrdenTrabajo(id, updateData);
        ResponseHandler.Ok(res, 'Orden de trabajo actualizada')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?

export const deleteOrdenTrabajo = async (req, res) => {
    try {
        const { idCliente } = req.params;
        await ordenTrabajoService.deleteOrdenTrabajo(idCliente);
        ResponseHandler.Ok(res, 'Cliente eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};