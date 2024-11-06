import itemProdServOrdenCompraRepository from "../../persistence/repositorys/operaciones/itemProdServOrdenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class itemProdServOrdenCompraService {
    async createitemProducto(data) {
        try {
            const id = idgenerate("orden-compra-producto");
            return  itemProdServOrdenCompraRepository.createitemProducto({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getProductoById(id) {
        try {
            return itemProdServOrdenCompraRepository.findItemProductoById(id);
        } catch (error) {
            throw error;
        }
    }
    async createitemServicio(data) {
        try {
            const id = idgenerate("orden-compra-servicio");
            return  itemProdServOrdenCompraRepository.createitemServicio({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getServicioById(id) {
        try {
            return itemProdServOrdenCompraRepository.findItemServicioById(id);
        } catch (error) {
            throw error;
        }
    }
    async getProdServByOrdenCompraId(userId) {
        try {
            return itemProdServOrdenCompraRepository.findAllProdServByOrdenCompraId(userId);
        } catch (error) {
            throw error;
        }
    }

    
    async updateItemProducto(id, updateData) {
        try {
            return itemProdServOrdenCompraRepository.updateItemProducto(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteItemProducto(id) {
        try {
            return itemProdServOrdenCompraRepository.deleteItemProducto(id);
        } catch (error) {
            throw error;
        }
    }
    async updateItemServicios(id, updateData) {
        try {
            return itemProdServOrdenCompraRepository.updateItemServicios(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteItemServicios(id) {
        try {
            return itemProdServOrdenCompraRepository.deleteItemServicios(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new itemProdServOrdenCompraService();