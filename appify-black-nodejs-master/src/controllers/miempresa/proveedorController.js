import { ResponseHandler } from "../../utils/dependencys/injection.js";
import proveedorService from "../../services/miempresa/proveedorService.js"
// Funciones que interactuan con la clase Service, se encargan de los parametros y las respuestas al cliente
//Crea un proveedor
export const createProveedorController = async (req, res) => {
    try {
        const {
            user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas
        } = req.body;
        const response = await proveedorService.createProveedorService(
            user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas
        );
        ResponseHandler.Ok(res, response);
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
}
export const getProveedoresByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedores = await proveedorService.getProveedoresByUserId(id);
        ResponseHandler.Ok(res, proveedores);
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
//Actualiza un proveedor
export const updateProveedorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const result = await proveedorService.updateProveedorService(id, updateFields)
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
export const getAllProveedoresActController = async (req, res, next) => {
    try {
        const {userId} = req.params
        const result = await proveedorService.getAllProvAct(userId)
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
export const getAllProveedoresInactController = async (req, res, next) => {
    try {
        const {userId} = req.params
        const result = await proveedorService.getAllProvInact(userId)
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
export const getProveedorByIdController = async (req, res, next) => {
    try {
        const { idProv } = req.params;
        const result = await proveedorService.getProveedorById(idProv)
        ResponseHandler.Ok(res, result);
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}