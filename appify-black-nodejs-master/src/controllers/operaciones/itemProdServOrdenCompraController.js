import itemProdServOrdenCompraService from "../../services/operaciones/itemProdServOrdenCompraService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createitemProducto = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemProdServOrdenCompraService.createitemProducto(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await itemProdServOrdenCompraService.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        ResponseHandler.Ok(res, producto)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const createitemServicio = async (req, res) => {
    try {
        const data = req.body;
        const response = await itemProdServOrdenCompraService.createitemServicio(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getServicioById = async (req, res) => {
    try {
        const { id } = req.params;
        const servicio = await itemProdServOrdenCompraService.getServicioById(id);
        if (!servicio) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }
        ResponseHandler.Ok(res, servicio)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProdServByOrdenCompraId = async (req, res) => {
    try {
        const { idOrden } = req.params;
        const prodservicios = await itemProdServOrdenCompraService.getProdServByOrdenCompraId(idOrden);
        ResponseHandler.Ok(res, prodservicios)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateItemProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemProdServOrdenCompraService.updateItemProducto(id, updateData);
        ResponseHandler.Ok(res, "Item actualizado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?
export const deleteItemProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await itemProdServOrdenCompraService.deleteItemProducto(id);
        ResponseHandler.Ok(res, "Item eliminado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateItemServicios = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await itemProdServOrdenCompraService.updateItemServicios(id, updateData);
        ResponseHandler.Ok(res, "Item actualizado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?
export const deleteItemServicios = async (req, res) => {
    try {
        const { id } = req.params;
        await itemProdServOrdenCompraService.deleteItemServicios(id);
        ResponseHandler.Ok(res, "Item eliminado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};