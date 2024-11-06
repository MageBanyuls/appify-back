import ItemsSistemaService from "../../../services/miempresa/configs/sistemaService.js";
import { ResponseHandler } from "../../../utils/dependencys/injection.js";
export const updateSistemaController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await ItemsSistemaService.updateSistema(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateEmpresaController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await ItemsSistemaService.updateEmpresa(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getSistemaYEmpresaByUserIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await ItemsSistemaService.getSistemaYEmpresaByUserId(userId);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}