import puntoDespachoClienteRepository from "../../persistence/repositorys/comercial/puntoDespachoClienteRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class puntoDespachoClienteService {
    async createPuntoDespacho(data) {
        try {
            const id = idgenerate("punto-despacho");
            return puntoDespachoClienteRepository.createPuntoDespacho({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getPuntoDespachoByClienteId(clienteId) {
        try {
            return puntoDespachoClienteRepository.findAllPuntosDespachoByClienteId(clienteId);
        } catch (error) {
            throw error;
        }
    }
    async updatePuntoDespacho(id, updateData) {
        try {
            return puntoDespachoClienteRepository.updatePuntoDespacho(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deletePuntoDespacho(id) {
        try {
            return puntoDespachoClienteRepository.deletePuntoDespacho(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new puntoDespachoClienteService();