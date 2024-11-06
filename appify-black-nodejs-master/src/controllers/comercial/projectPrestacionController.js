import projectPrestacionService from "../../services/comercial/projectPrestacionService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createProjectPrestacion = async (req, res) => {
    try {
        const data = req.body;
        const response = await projectPrestacionService.createProjectPrestacion(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProjectPrestacionById = async (req, res) => {
    try {
        const idString = req.params.idProyecto;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idProyecto = parseInt(idString, 10);
        const proyectop = await projectPrestacionService.getProjectPrestacionById(idProyecto);
        if (!proyectop) {
            return res.status(404).json({ message: 'Direccion de prestacion no encontrada' });
        }
        ResponseHandler.Ok(res, proyectop)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateProjectPrestacion = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        const updateData = req.body;
        await projectPrestacionService.updateProjectPrestacion(idProyecto, updateData);
        ResponseHandler.Ok(res, 'Direccion actualizada')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteProjectPrestacion = async (req, res) => {
    try {
        const idString = req.params.idProyecto;
        const idProyecto = parseInt(idString, 10);
        await projectPrestacionService.deleteProjectPrestacion(idProyecto);
        ResponseHandler.Ok(res, 'Direccion eliminada')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};