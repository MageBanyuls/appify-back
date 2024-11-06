import ServiceService from "../../services/miempresa/ServiceService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createService = async (req, res) => {
    try {
        const data = req.body;
        const response = await ServiceService.createService(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getServiceById = async (req, res) => {
    try {
        const { idServicio } = req.params;
        const servicio = await ServiceService.getServiceById(idServicio);
        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        ResponseHandler.Ok(res, servicio)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getServiceByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ServiceService.getServiceByUserId(id);
        ResponseHandler.Ok(res, service)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateService = async (req, res) => {
    try {
        const { idServicio } = req.params;
        const updateData = req.body;
        await ServiceService.updateService(idServicio, updateData);
        ResponseHandler.Ok(res, 'Servicio actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteService = async (req, res) => {
    try {
        const { idServicio } = req.params;
        await ServiceService.deleteService(idServicio);
        ResponseHandler.Ok(res, 'Servicio eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};