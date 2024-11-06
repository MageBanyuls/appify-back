import anticiposClienteProvRepository from "../../persistence/repositorys/comercial/anticiposClienteProvRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class anticipoClientesProvService {
    async createAnticipoCliente(data) {
        try {
            const id = idgenerate("anticipo-cliente");
            return anticiposClienteProvRepository.createAnticipoCliente({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getAnticiposClienteByProyectoId(proyectoId) {
        try {
            return anticiposClienteProvRepository.findAllAnticiposCienteByProyectoId(proyectoId);
        } catch (error) {
            throw error
        }
    }
    async updateAnticipoCliente(id, updateData) {
        try {
            return anticiposClienteProvRepository.updateAnticipoCliente(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteAnticipoCliente(id) {
        try {
            return anticiposClienteProvRepository.deleteAnticipoCliente(id);
        } catch (error) {
            throw error
        }
    }
    async createAnticipoProveedor(data) {
        try {
            const id = idgenerate("anticipo-proveedor");
            return anticiposClienteProvRepository.createAnticipoProveedor({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getAnticiposProveedorByProyectoId(proyectoId) {
        try {
            return anticiposClienteProvRepository.findAllAnticiposProveedorByProyectoId(proyectoId);
        } catch (error) {
            throw error
        }
    }
    async updateAnticipoProveedor(id, updateData) {
        try {
            return anticiposClienteProvRepository.updateAnticipoProveedor(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteAnticipoProveedor(id) {
        try {
            return anticiposClienteProvRepository.deleteAnticipoProveedor(id);
        } catch (error) {
            throw error
        }
    }
}
export default new anticipoClientesProvService();