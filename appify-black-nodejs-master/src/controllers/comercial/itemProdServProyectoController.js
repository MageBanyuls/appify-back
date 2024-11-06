import itemsProdServProjectService from "../../services/comercial/itemsProdServProyectosService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createItemProductProject = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemsProdServProjectService.createItemProductProject(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProductItemById = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const proyecto = await itemsProdServProjectService.getProductItemById(idProyecto);
        if (!proyecto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        ResponseHandler.Ok(res, proyecto)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProductsItemByprojectId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await itemsProdServProjectService.getProductsItemByprojectId(idProyecto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateProductItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const updateData = req.body;
        await itemsProdServProjectService.updateProductItem(idProyecto, updateData);
        ResponseHandler.Ok(res, 'Item actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteProductItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await itemsProdServProjectService.deleteProductItem(idProyecto);
        ResponseHandler.Ok(res, 'Item eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
// Servicios Items
export const createServiceItem = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemsProdServProjectService.createServiceItem(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getServiceItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await itemsProdServProjectService.getServiceItemById(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        ResponseHandler.Ok(res, proyecto)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getServiceItemByProjectId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await itemsProdServProjectService.getServiceItemByProjectId(idProyecto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateServiceItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemsProdServProjectService.updateServiceItem(id, updateData);
        ResponseHandler.Ok(res, 'Item actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteServiceItem = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        await itemsProdServProjectService.deleteServiceItem(idProyecto);
        ResponseHandler.Ok(res, 'Item eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};