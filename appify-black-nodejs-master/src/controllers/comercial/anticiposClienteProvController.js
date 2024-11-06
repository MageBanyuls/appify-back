import anticipoClientesProvService from "../../services/comercial/anticiposClienteProvService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createAnticipoCliente = async (req, res) => {
    try {
        const data = req.body;
        const response = await anticipoClientesProvService.createAnticipoCliente(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAnticiposClienteByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await anticipoClientesProvService.getAnticiposClienteByProyectoId(idProyecto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateAnticipoCliente = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await anticipoClientesProvService.updateAnticipoCliente(id, updateData);
        ResponseHandler.Ok(res, 'Anticipo actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteAnticipoCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await anticipoClientesProvService.deleteAnticipoCliente(id);
        ResponseHandler.Ok(res, 'Anticipo eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createAnticipoProveedor = async (req, res) => {
    try {
        const data = req.body;
        const response = await anticipoClientesProvService.createAnticipoProveedor(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAnticiposProveedorByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;
        const projects = await anticipoClientesProvService.getAnticiposProveedorByProyectoId(idProyecto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateAnticipoProveedor = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await anticipoClientesProvService.updateAnticipoProveedor(id, updateData);
        ResponseHandler.Ok(res, 'Anticipo actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteAnticipoProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        await anticipoClientesProvService.deleteAnticipoProveedor(id);
        ResponseHandler.Ok(res, 'Anticipo eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};