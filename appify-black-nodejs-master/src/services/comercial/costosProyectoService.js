import costosProyectoRepository from "../../persistence/repositorys/comercial/costosProyectoRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class costosProyectoService {
    async createCosto(data) {
        try {
            const id = idgenerate("costo-proyecto");
            return costosProyectoRepository.createCosto({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getCostosByProyectoId(proyectoId) {
        try {
            const res = await costosProyectoRepository.findAllCostosByProyectoId(proyectoId);
            return res
        } catch (error) {
            throw error
        }
    }
    async updateCosto(id, updateData) {
        try {
            return costosProyectoRepository.updateCosto(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteCosto(id) {
        try {
            return costosProyectoRepository.deleteCosto(id);
        } catch (error) {
            throw error
        }
    }
}
export default new costosProyectoService();