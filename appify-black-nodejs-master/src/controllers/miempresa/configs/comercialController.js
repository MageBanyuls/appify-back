import { ResponseHandler } from "../../../utils/dependencys/injection.js";
import comercialService from "../../../services/miempresa/configs/comercialService.js";
export const updateProyectoController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await comercialService.updateProyecto(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const updateParaClientesController = async (req, res) => {
    try {
        const { id } = req.params;
        const inputData = req.body
        const result = await comercialService.updateParaClientes(parseInt(id), inputData);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getProyectoYParaClientesController = async (req, res) => {
    try {
        const { empresaId } = req.params;
        const result = await comercialService.getProyectoYParaClientes(empresaId);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}