import ProjectService from "../../services/comercial/ProjectService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createProjectAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProjectService.createProjectAll(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProjectById = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const proyecto = await ProjectService.getProjectById(idProyecto);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        ResponseHandler.Ok(res, proyecto)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProjectsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await ProjectService.getProjectsByUserId(userId);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllDataProjectsbyUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const projects = await ProjectService.getAllDataProjects(id);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateProject = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const updateData = req.body;
        await ProjectService.updateProject(idProyecto, updateData);
        ResponseHandler.Ok(res, "Proyecto actualizado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};


export const deleteProject = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await ProjectService.deleteProject(idProyecto);
        ResponseHandler.Ok(res, "Proyecto eliminado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};