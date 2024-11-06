import { ResponseHandler } from "../../../utils/dependencys/injection.js";
import contabilidadService from "../../../services/miempresa/configs/contabilidadService.js";
export const createFEController = async (req, res) => {
    try {
        const { recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra } = req.body;
        const result = await contabilidadService.createFE(recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateFEController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await contabilidadService.updateFE(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createCobranzasController = async (req, res) => {
    try {
        const { asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3 } = req.body;
        const result = await contabilidadService.createCobranza(asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateCobranzasController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await contabilidadService.updateCobranza(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const createAdmModulos = async (req, res) => {
    try {
        const data = {
            administracion_impuesto: req.body.administracion_impuesto,
            administracion_anticipo: req.body.administracion_anticipo,
            administracion_por_clasificar: req.body.administracion_por_clasificar,
            administracion_por_cobrar: req.body.administracion_por_cobrar,
            administracion_por_pagar: req.body.administracion_por_pagar
        };
        const result = await contabilidadService.executeOperationsModuloAdministracion(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateAdmModulos = async (req, res) => {
    try {
        const data = {
            administracion_impuesto: req.body.administracion_impuesto,
            administracion_anticipo: req.body.administracion_anticipo,
            administracion_por_clasificar: req.body.administracion_por_clasificar,
            administracion_por_cobrar: req.body.administracion_por_cobrar,
            administracion_por_pagar: req.body.administracion_por_pagar
        };
        const result = await contabilidadService.UpdateExecuteOperationsModuloAdministracion(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getItemsByIdEmpresaController = async (req, res) => {
    try {
        const {idEmpresa} = req.params
        const result = await contabilidadService.getItemsByIdEmpresa(idEmpresa);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}