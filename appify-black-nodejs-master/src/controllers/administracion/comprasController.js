import comprasService from "../../services/administracion/comprasService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createFCController = async (req, res) => {
    try {
        const data = {
            documento_compra: req.body.documento_compra,
            factura_compra: req.body.factura_compra,
            item_servicio_factura_compra: req.body.item_servicio_factura_compra,
            item_producto_factura_compra: req.body.item_producto_factura_compra,
        };
        const result = await comprasService.createFC(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createFCEController = async (req, res) => {
    try {
        const data = {
            documento_compra: req.body.documento_compra,
            factura_compra_excenta: req.body.factura_compra_excenta,
            item_servicio_factura_compra_excenta: req.body.item_servicio_factura_compra_excenta,
            item_producto_factura_compra_excenta: req.body.item_producto_factura_compra_excenta,
        };
        const result = await comprasService.createFCE(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createNCoDConItemsController = async (req, res) => {
    try {
        const data = {
            notas_de_credito_debito_compras: req.body.notas_de_credito_debito_compras,
            nota_factura_compra: req.body.nota_factura_compra,
            nota_factura_compra_excenta: req.body.nota_factura_compra_excenta,
            nota_credito_nota_NC_compra: req.body.nota_credito_nota_NC_compra,
            item_servicio_nota_credito_compra: req.body.item_servicio_nota_credito_compra,
            item_producto_nota_credito_compra: req.body.item_producto_nota_credito_compra,
            item_servicio_nota_credito_NC_compra: req.body.item_servicio_nota_credito_NC_compra,
            item_producto_nota_credito_NC_compra: req.body.item_producto_nota_credito_NC_compra,
            item_servicio_factura_compra: req.body.item_servicio_factura_compra,
            item_producto_factura_compra: req.body.item_producto_factura_compra,
            item_servicio_factura_compra_excenta: req.body.item_servicio_factura_compra_excenta,
            item_producto_factura_compra_excenta: req.body.item_producto_factura_compra_excenta,
        };
        const result = await comprasService.createNCoDyItems(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getAllDocumentosComprasController  = async (req, res) => {
    try {
        const documentos = await comprasService.getAllDocCompra();
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getDocumentosCompraByUserController  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await comprasService.getDCByUser(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getAllDataComprasByUserId  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await comprasService.getAllDataComprasByUserId(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}

export const getAllDataAgosComprasByUserId  = async (req, res) => {
    try {
        const {user} = req.params
        const documentos = await comprasService.getAllDataAgosComprasByUserId(user);
        ResponseHandler.Ok(res, documentos)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getFCbyIdDocController = async (req, res) => {
    try {
        const { fcDCID } = req.params
        const result = await comprasService.getFCoFCEbyIdDoc(fcDCID, false);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getFCEbyIdDocController = async (req, res) => {
    try {
        const { fceDCID } = req.params
        const result = await comprasService.getFCoFCEbyIdDoc(false, fceDCID);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getNCODbyIdDocController = async (req, res) => {
    try {
        const {DCID} = req.params
        const result = await comprasService.getNCoDbyIdDoc(DCID);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getItemsNCODbyIdNCODController = async (req, res) => {
    try {
        const {NCOD, tipoNota} = req.params
        const result = await comprasService.getItemsByNCOD(NCOD, tipoNota);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}




//funcion para test
export const testController = async (req, res) => {
    try {
        const {idDocumentoCompra} = req.params
        const result = await comprasService.getFCoFCEbyDC(idDocumentoCompra);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}