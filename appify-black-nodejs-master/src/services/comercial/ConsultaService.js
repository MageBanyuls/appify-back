import ConsultasRepository from "../../persistence/repositorys/comercial/consultasRepository.js";
class ConsultaService {
    async createConsulta(data) {
        try {
            return ConsultasRepository.createConsulta({ ...data });
        } catch (error) {
            throw error
        }
    }
    async getConsultasByUserId(userId) {
        try {
            return ConsultasRepository.findAllConsultasByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async updateConsulta(id, updateData) {
        try {
            return ConsultasRepository.updateConsulta(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteConsulta(id) {
        try {
            return ConsultasRepository.deleteConsulta(id);
        } catch (error) {
            throw error
        }
    }
}
export default new ConsultaService();