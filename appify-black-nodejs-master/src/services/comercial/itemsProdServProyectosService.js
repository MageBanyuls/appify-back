import itemsProdServicioProyectosRepository from "../../persistence/repositorys/comercial/itemsProdServicioProyectosRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class itemsProdServProjectService {
    async createItemProductProject(data) {
        try {
            const id = idgenerate("item-product-project");
            return itemsProdServicioProyectosRepository.createProductItem({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getProductItemById(id) {
        try {
            return itemsProdServicioProyectosRepository.findProductByIdProyecto(id);
        } catch (error) {
            throw error
        }
    }
    async getProductsItemByprojectId(proyectId) {
        try {
            return itemsProdServicioProyectosRepository.findAllProductosByProyectId(proyectId);
        } catch (error) {
            throw error
        }
    }
    async updateProductItem(id, updateData) {
        try {
            return itemsProdServicioProyectosRepository.updateProductItem(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteProductItem(id) {
        try {
            return itemsProdServicioProyectosRepository.deleteProductItem(id);
        } catch (error) {
            throw error
        }
    }
    async createServiceItem(data) {
        try {
            const id = idgenerate("item-service-project");
            return itemsProdServicioProyectosRepository.createServiceItem({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getServiceItemById(id) {
        try {
            return itemsProdServicioProyectosRepository.findServiceById(id);
        } catch (error) {
            throw error
        }
    }
    async getServiceItemByProjectId(proyectId) {
        try {
            return itemsProdServicioProyectosRepository.findAllServiciosByServiceId(proyectId);
        } catch (error) {
            throw error
        }
    }
    async updateServiceItem(id, updateData) {
        try {
            return itemsProdServicioProyectosRepository.updateServiceItem(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteServiceItem(id) {
        try {
            return itemsProdServicioProyectosRepository.deleteServiceItem(id);
        } catch (error) {
            throw error
        }
    }
}
export default new itemsProdServProjectService();