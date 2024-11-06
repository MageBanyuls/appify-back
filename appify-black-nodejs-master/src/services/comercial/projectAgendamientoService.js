import ProjectPrestacionRepository from "../../persistence/repositorys/comercial/projectAgendamientoRepository.js";
class ProjectAgendamientoService {
    async createProjectAgendamiento(data) {
        try {
            return ProjectPrestacionRepository.createProjectAgendamiento({ ...data });
        } catch (error) {
            throw error;
        }
    }
    async getProjectAgendamientoById(id) {
        try {
        return ProjectPrestacionRepository.findProjectAgendamientoById(id);
        } catch (error) {
            throw error;
        }
    }
    async updateProjectAgendamiento(id, updateData) {
        try {
            return ProjectPrestacionRepository.updateProjectAgendamiento(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteProjectAgendamiento(id) {
        try {
            return ProjectPrestacionRepository.deleteProjectAgendamiento(id)
        } catch (error) {
            throw error;
        }
    }
}
export default new ProjectAgendamientoService();