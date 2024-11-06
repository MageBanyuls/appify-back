import ordenCompraService from "../../services/operaciones/ordenCompraService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createOrdenCompra = async (req, res) => {
    try {
        const data = req.body;
        const response = await ordenCompraService.createOCAll(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getOrdenCompraById = async (req, res) => {
    try {
        const { id } = req.params;
        const ordencompra = await ordenCompraService.getOrdenCompraById(id);
        if (!ordencompra) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        ResponseHandler.Ok(res, ordencompra)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getAllDataOrdenCompraByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const ordencompra = await ordenCompraService.getAllDataOrdenCompraByUserId(id);
        if (!ordencompra) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        ResponseHandler.Ok(res, ordencompra)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getOrdenCompraByUserId = async (req, res) => {
    try {
        const { idUser } = req.params;
        const ordencompra = await ordenCompraService.getOrdenCompraByUserId(idUser);
        ResponseHandler.Ok(res, ordencompra)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        await ordenCompraService.updateOrdenCompra(id, updateData);
        ResponseHandler.Ok(res, 'Orden de trabajo actualizada')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

// Esta funcion va a quedar comentada por si la usamos enun futuro pero no se deberian borrar las ordenes de trabajo...o si?
/*
export const deleteOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;
        await ordenCompraService.deleteOrdenCompra(id);
        res.status(200).json({ message: 'OC eliminado' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};*/