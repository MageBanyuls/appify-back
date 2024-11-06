import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class ProjectAgendamientoRepository{
    async createProjectAgendamiento(data) {
        try {
            return prisma.agendamiento_proyecto.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findProjectAgendamientoById(id) {
        try {
            return prisma.agendamiento_proyecto.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateProjectAgendamiento(id, updateData) {
        try {
            return prisma.agendamiento_proyecto.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteProjectAgendamiento(id) {
        try {
            return prisma.agendamiento_proyecto.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ProjectAgendamientoRepository();