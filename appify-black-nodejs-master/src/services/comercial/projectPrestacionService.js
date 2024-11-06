import ProjectPrestacionRepository from "../../persistence/repositorys/comercial/projectPrestacionRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class ProjectPrestacionService {
    async createProjectPrestacion(data) {
        try {
            const id = idgenerate('Direccion-prestacion')
            return ProjectPrestacionRepository.createProjectPrestacion({ ...data, id :id});
        } catch (error) {
            throw error;
        }
    }
    async getProjectPrestacionById(id) {
        try {
            return ProjectPrestacionRepository.findProjectPrestacionById(id);
        } catch (error) {
            throw error;
        }
    }
    async updateProjectPrestacion(id, updateData) {
        try {
            return ProjectPrestacionRepository.updateProjectPrestacion(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteProjectPrestacion(id) {
        try {
            return ProjectPrestacionRepository.deleteProjectPrestacion(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ProjectPrestacionService();