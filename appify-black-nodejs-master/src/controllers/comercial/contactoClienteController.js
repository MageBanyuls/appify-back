import contactoClienteService from "../../services/comercial/contactoClienteService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createContacto = async (req, res) => {
    try {
        const data = req.body;
        const response = await contactoClienteService.createContacto(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getContactosByClienteId = async (req, res) => {
    try {
        const { idContacto } = req.params;
        const projects = await contactoClienteService.getContactosByClienteId(idContacto);
        ResponseHandler.Ok(res, projects)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateContacto = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        await contactoClienteService.updateContacto(id, updateData);
        ResponseHandler.Ok(res, 'Contacto actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteContacto = async (req, res) => {
    try {
        const { id } = req.params;
        await contactoClienteService.deleteContacto(id);
        ResponseHandler.Ok(res, 'Contacto eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};