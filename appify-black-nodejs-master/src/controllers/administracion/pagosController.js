import pagosService from "../../services/administracion/pagosService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createPagosAll = async (req, res) => {
    try {
        const data = req.body;
        const response = await pagosService.createPagosAll(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getPagosAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await pagosService.getPagosAllById(id);
        ResponseHandler.Ok(res, pago)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllPagosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const pagos = await pagosService.getAllPagosByUserId(id);
        ResponseHandler.Ok(res, pagos)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllPagosDataByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const pagos = await pagosService.getAllPagosDataByUserId(id);
        ResponseHandler.Ok(res, pagos)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updatePago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const pago = await pagosService.updatePagos(id, updateData);
        ResponseHandler.Ok(res, pago)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updatePagoFC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await pagosService.updatePagoFC(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updatePagoNC = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const pago = await pagosService.updatePagoNC(id, updateData);
        ResponseHandler.Ok(res, pago)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deletePagoFC = async (req, res) => {
    try {
        const { id } = req.params;
        const pago = await pagosService.deletePagoFC(id);
        ResponseHandler.Ok(res, pago)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deletePagoNC = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pagosService.deletePagoNC(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};