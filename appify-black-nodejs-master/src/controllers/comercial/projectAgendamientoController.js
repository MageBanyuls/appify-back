import ProjectAgendamientoService from "../../services/comercial/projectAgendamientoService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createProjectAgendamiento = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProjectAgendamientoService.createProjectAgendamiento(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProjectAgendamientoById = async (req, res) => {
    try {
        const idString = req.params.idProyecto;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idProyecto = parseInt(idString, 10);
        const proyectoa = await ProjectAgendamientoService.getProjectAgendamientoById(idProyecto);
        if (!proyectoa) {
            return res.status(404).json({ message: 'Agendamiento no encontrado' });
        }
        ResponseHandler.Ok(res, proyectoa)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateProjectAgendamiento = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        const updateData = req.body;
        await ProjectAgendamientoService.updateProjectAgendamiento(idProyecto, updateData);
        ResponseHandler.Ok(res, 'Agendamiento actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteProjectAgendamiento = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        await ProjectAgendamientoService.deleteProjectAgendamiento(idProyecto);
        ResponseHandler.Ok(res, 'Agendamiento eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};