import { ResponseHandler } from "../../utils/dependencys/injection.js";
import ventasService from "../../services/administracion/ventasService.js";
export const createFVController = async (req, res) => {
    try {
        const data = {
            emisor : req.body.emisor,
            documento_venta: req.body.documento_venta,
            factura_venta: req.body.factura_venta,
            item_servicio_factura_venta: req.body.item_servicio_factura_venta,
            item_producto_factura_venta: req.body.item_producto_factura_venta,
            orden_trabajo_FV: req.body.orden_trabajo_FV
        };
        const result = await ventasService.createFV(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getAllFVController = async (req, res) => {
    try {
        const result = await ventasService.getAllFV();
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getFVbyIdDocController = async (req, res) => {
    try {
        const { fvDVID } = req.params
        const result = await ventasService.getFVoFVEbyIdDoc(fvDVID, false);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createFVEController = async (req, res) => {
    try {
        const data = {
            emisor: req.body.emisor,
            documento_venta: req.body.documento_venta,
            factura_venta_excenta: req.body.factura_venta_excenta,
            item_servicio_factura_venta_excenta: req.body.item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta: req.body.item_producto_factura_venta_excenta,
            orden_trabajo_FVE: req.body.orden_trabajo_FVE
        };
        const result = await ventasService.createFVE(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getFVEbyIdDocController = async (req, res) => {
    try {
        const {fveDVID} = req.params
        const result = await ventasService.getFVoFVEbyIdDoc(false,fveDVID);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createNCoDConItemsController = async (req, res) => {
    try {
        const data = {
            emisor: req.body.emisor,
            notas_de_credito_debito: req.body.notas_de_credito_debito,
            nota_factura_venta: req.body.nota_factura_venta,
            nota_factura_venta_excenta: req.body.nota_factura_venta_excenta,
            nota_credito_nota_NC: req.body.nota_credito_nota_NC,
            item_servicio_nota_credito: req.body.item_servicio_nota_credito,
            item_producto_nota_credito: req.body.item_producto_nota_credito,
            item_servicio_nota_credito_NC: req.body.item_servicio_nota_credito_NC,
            item_producto_nota_credito_NC: req.body.item_producto_nota_credito_NC,
            item_servicio_factura_venta: req.body.item_servicio_factura_venta,
            item_producto_factura_venta: req.body.item_producto_factura_venta,
            item_servicio_factura_venta_excenta: req.body.item_servicio_factura_venta_excenta,
            item_producto_factura_venta_excenta: req.body.item_producto_factura_venta_excenta,
        };
        const result = await ventasService.createNCoDyItems(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createDDController = async (req, res) => {
    try {
        const data = {
            documento_despacho: req.body.documento_despacho,
            documento_despacho_venta: req.body.documento_despacho_venta,
            item_producto_documento_despacho_venta: req.body.item_producto_documento_despacho_venta,
            item_despacho_venta_ot: req.body.item_despacho_venta_ot,
            documento_despacho_traslado: req.body.documento_despacho_traslado,
            item_despacho_traslado_ot: req.body.item_despacho_traslado_ot,
            item_producto_documento_despacho_traslado: req.body.item_producto_documento_despacho_traslado,
        };
        const result = await ventasService.createDD(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getNCODbyIdDocController = async (req, res) => {
    try {
        const {DVID} = req.params
        const result = await ventasService.getNCoDbyIdDoc(DVID);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getItemsNCODbyIdNCODController = async (req, res) => {
    try {
        const {NCOD, tipoNota} = req.params
        const result = await ventasService.getItemsByNCOD(NCOD, tipoNota);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getAllDocumentosVentaController  = async (req, res) => {
    try {
        const documentos = await ventasService.getAllDocVenta();
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getDocumentosVentaByUserController  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await ventasService.getDVByUser(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getAllDataVentasByUserId  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await ventasService.getAllDataVentasByUserId(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}

export const getAllDataAgosVentasByUserId  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await ventasService.getAllDataAgosVentasByUserId(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}

export const getAllDocumentosDespachoController  = async (req, res) => {
    try {
        const documentosDespacho = await ventasService.getAllDocDespacho();
        ResponseHandler.Ok(res, documentosDespacho)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getDocumentosDespachoByUserController  = async (req, res) => {
    try {
        const {user} = req.params
        const documentosDespacho = await ventasService.getDDByUser(user);
        ResponseHandler.Ok(res, documentosDespacho)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}


//CONTROLLER HECHO PARA TEST
export const testController  = async (req, res) => {
    try {
        const {idDocumentoVenta} = req.params
        const documentosDespacho = await ventasService.getFVoFVEbyDC(idDocumentoVenta);
        ResponseHandler.Ok(res, documentosDespacho)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}







