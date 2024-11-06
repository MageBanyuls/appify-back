import EcommerceService from "../../services/comercial/ecommerceService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createEcommerce = async (req, res) => {
    try {
        const data = req.body;
        const response = await EcommerceService.createEcommerce(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getEcommerceById = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        const ecommerce = await EcommerceService.getEcommerceById(idEcommerce);
        if (!ecommerce) {
            return res.status(404).json({ message: 'E-commerce no encontrado' });
        }
        ResponseHandler.Ok(res, ecommerce)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getEcommerceByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const ecommerce = await EcommerceService.getEcommerceByUserId(id);
        ResponseHandler.Ok(res, ecommerce)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getEcommerceByCategoryId = async (req, res) => {
    try {
        const { idUser } = req.params; // Brindando id de user y en el body la categoria buscada
        const data = req.body;
        const ecommerce = await EcommerceService.getEcommerceByCategory(idUser,data.categoria);
        ResponseHandler.Ok(res, ecommerce)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateEcommerce = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        const updateData = req.body;
        await EcommerceService.updateEcommerce(idEcommerce, updateData);
        ResponseHandler.Ok(res, 'E-commerce actualizado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteEcommerce = async (req, res) => {
    try {
        const idString = req.params.idEcommerce;  // Acceder id.Ecommerce del objeto y llevarlo a int 
        const idEcommerce = parseInt(idString, 10);
        await EcommerceService.deleteEcommerce(idEcommerce);
        ResponseHandler.Ok(res, 'E-commerce eliminado')
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};