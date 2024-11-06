import transportistaService from "../../services/administracion/transportistaService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createTransportista = async (req, res) => {
    try {
        const data = req.body;
        const response = await transportistaService.createTransportista(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getTransportistaById = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        const transportista = await transportistaService.getTransportistaById(idTransportista);
        if (!transportista) {
            return res.status(404).json({ message: 'Transportista no encontrado' });
        }
        ResponseHandler.Ok(res, transportista)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getTransportistaByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const transportista = await transportistaService.getTransportistaByUserId(id);
        ResponseHandler.Ok(res, transportista)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateTransportista = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        const updateData = req.body;
        await transportistaService.updateTransportista(idTransportista, updateData);
        ResponseHandler.Ok(res, 'Transportista actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteTransportista = async (req, res) => {
    try {
        const { idTransportista } = req.params;
        await transportistaService.deleteTransportista(idTransportista);
        ResponseHandler.Ok(res, 'Transportista eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};