import clientesService from "../../services/comercial/clientesService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createCliente = async (req, res) => {
    try {
        const data = req.body;
        const response = await clientesService.createCliente(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getClienteById = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const cliente = await clientesService.getClienteById(idCliente);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        ResponseHandler.Ok(res, cliente)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getAllDatosPesadosByClienteId= async (req, res) => {
    try {
        const { idCliente } = req.params;
        const cliente = await clientesService.getAllDatosPesadosByClienteId(idCliente);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        ResponseHandler.Ok(res, cliente)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getClienteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesService.getClienteByUserId(id);
        ResponseHandler.Ok(res, cliente)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};

export const getAllDataClienteByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await clientesService.getAllDataClienteByUserId(id);
        ResponseHandler.Ok(res, cliente)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const updateData = req.body;
        await clientesService.updateCliente(idCliente, updateData);
        ResponseHandler.Ok(res, 'Cliente actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteCliente = async (req, res) => {
    try {
        const { idCliente } = req.params;
        await clientesService.deleteCliente(idCliente);
        ResponseHandler.Ok(res, 'Cliente eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};