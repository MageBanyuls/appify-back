import priceListService from "../../services/miempresa/PriceListService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const getAllPriceLists = async (req, res, next) => {
    const { userId } = req.params; // Asumiendo que se obtiene el userId de algún middleware de autenticación o similar
    try {
        const lists = await priceListService.getPriceListsByUserId(userId);
        ResponseHandler.Ok(res, lists)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
}
export const getPriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body; // O de un token JWT, por ejemplo
    try {
        const list = await priceListService.getPriceListByIdAndUserId(id, userId);
        if (!list) {
            return res.status(404).json({ ok: false, message: "Lista de precios no encontrada." });
        }
        ResponseHandler.Ok(res, list)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
}
export const createPriceList = async (req, res, next) => {
    const { user, nombre, iva } = req.body;
    try {
        const result = await priceListService.createPriceList(user, nombre, iva);
        ResponseHandler.Ok(res, result)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
}
export const updatePriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId, ...updateFields } = req.body;
    try {
        const result = await priceListService.updatePriceList(id, userId, updateFields);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, err)
    }
}
export const deletePriceList = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.body; // O de un token JWT, por ejemplo
    try {
        const result = await priceListService.deletePriceList(id, userId);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, err)
    }
}