import puntoDespachoClienteService from "../../services/comercial/puntoDespachoClienteService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createPuntoDespacho = async (req, res) => {
    try {
        const data = req.body;
        const response = await puntoDespachoClienteService.createPuntoDespacho(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getPuntoDespachoByClienteId = async (req, res) => {
    try {
        const { idContacto } = req.params;
        const projects = await puntoDespachoClienteService.getPuntoDespachoByClienteId(idContacto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updatePuntoDespacho = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await puntoDespachoClienteService.updatePuntoDespacho(id, updateData);
        ResponseHandler.Ok(res, 'Punto de despacho actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deletePuntoDespacho = async (req, res) => {
    try {
        const { id } = req.params;
        await puntoDespachoClienteService.deletePuntoDespacho(id);
        ResponseHandler.Ok(res, 'Punto de despacho eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};