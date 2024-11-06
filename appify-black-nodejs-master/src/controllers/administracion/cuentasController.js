import cuentasService from "../../services/administracion/cuentasService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createCuentasBanco = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentasBanco(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createCuentaBancoConciliacion = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentaBancoConciliacion(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createCategoriaCuenta = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCategoriaCuenta(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createCuentaTipoDocumento = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCuentaTipoDocumento(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createBanco = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createBanco(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createCondicionPago = async (req, res) => {
    try {
        const data = req.body;
        const response = await cuentasService.createCondicionPago(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentaBancoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaBancoById(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentaBancoConciliacionId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaBancoConciliacionId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCategoriaCuentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCategoriaCuentaById(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCuentaTipodocumentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCuentaTipodocumentoById(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCondicionPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCondicionPagoById(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCondicionesCondicionPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCondicionesCondicionPagoById(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getCondicionAndCondicionesByCondicionId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getCondicionAndCondicionesByCondicionId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCuentasBancoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasBancoByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCuentasBancoConciliacionByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasBancoConciliacionByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getAllCategoriasCuentaByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCategoriasCuentaByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCuentasTipoDocumentoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCuentasTipoDocumentoByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllBancosByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllBancosByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getAllCondicionPagoByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await cuentasService.getAllCondicionPagoByUserId(id);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCuentasBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateCuentasBanco(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCategoriaCuenta = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateCategoriaCuenta(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCuentaTipoDoc = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateCuentaTipoDoc(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateBanco = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateBanco(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCondicionPago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateCondicionPago(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCondicionesCondicionPago = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const response = await cuentasService.updateCondicionesCondicionPago(id, updateData);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};