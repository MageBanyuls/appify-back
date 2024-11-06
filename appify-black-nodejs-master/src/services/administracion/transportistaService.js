import TransportistaRepository from "../../persistence/repositorys/administracion/transportistaRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class TransportistaService {
    async createTransportista(data) {
        try {
            const id = idgenerate("transportista");
            return  TransportistaRepository.createTransportista({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getTransportistaById(id) {
        try {
            return TransportistaRepository.findTransportistaById(id);
        } catch (error) {
            throw error
        }
    }
    async getTransportistaByUserId(userId) {
        try {
            return TransportistaRepository.findAllTransportistasByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async updateTransportista(id, updateData) {
        try {
            return TransportistaRepository.updateTransportista(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteTransportista(id) {
        try {
            return TransportistaRepository.deleteTransportista(id);
        } catch (error) {
            throw error
        }
    }
}
export default new TransportistaService();