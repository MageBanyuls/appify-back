import costosProyectoService from "../../services/comercial/costosProyectoService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createCosto = async (req, res) => {
    try {
        const data = req.body;
        const response = await costosProyectoService.createCosto(data);
        ResponseHandler.Ok(res, response);
    } catch (err) {
        ResponseHandler.HandleError(res, err);
    }
};
export const getCostosByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await costosProyectoService.getCostosByProyectoId(idProyecto);
        ResponseHandler.Ok(res, projects);
    } catch (err) {
        ResponseHandler.HandleError(res, err);
    }
};
export const updateCosto = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await costosProyectoService.updateCosto(id, updateData);
        ResponseHandler.Ok(res, 'Costo actualizado');
    } catch (err) {
        ResponseHandler.HandleError(res, err);
    }
};
export const deleteCosto = async (req, res) => {
    try {
        const { id } = req.params;
        await costosProyectoService.deleteCosto(id);
        ResponseHandler.Ok(res, 'Costo eliminado');
    } catch (err) {
        ResponseHandler.HandleError(res, err);
    }
};