import ProductService from "../../services/miempresa/ProductService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createProduct = async (req, res) => {
    try {
        const data = req.body;
        const response = await ProductService.createProduct(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProductById = async (req, res) => {
    try {
        const { idProducto } = req.params;
        //const { userid } = req.params.userid;
        const product = await ProductService.getProductById(idProducto);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        ResponseHandler.Ok(res, product)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getProductsByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await ProductService.getProductsByUserId(id);
        ResponseHandler.Ok(res, products)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { idProducto } = req.params;
        const updateData = req.body;
        await ProductService.updateProduct(idProducto, updateData);
        ResponseHandler.Ok(res, "Producto actualizado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const { idProducto } = req.params;
        await ProductService.deleteProduct(idProducto);
        ResponseHandler.Ok(res, "Producto eliminado")
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};