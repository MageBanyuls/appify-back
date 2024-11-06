import cobrosService from "../../services/administracion/cobrosService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createCobrosAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await cobrosService.createCobrosAll(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCobrosAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const cobro = await cobrosService.getCobrosAllById(id);
        ResponseHandler.Ok(res, cobro)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCobrosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cobros = await cobrosService.getCobrosByUserId(id);
        ResponseHandler.Ok(res, cobros)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCobrosDataByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cobros = await cobrosService.getAllCobrosDataByUserId(id);
        ResponseHandler.Ok(res, cobros)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCobro = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await cobrosService.updateCobro(id, updateData);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCobroFV = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await cobrosService.updateCobroFV(id, updateData);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCobroFVE = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await cobrosService.updateCobroFVE(id, updateData);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCobroNC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await cobrosService.updateCobroNC(id, updateData);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteCobroFV = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cobrosService.deleteCobroFV(id);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteCobroFVE = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cobrosService.deleteCobroFVE(id);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteCobroNC = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cobrosService.deleteCobroNC(id);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};