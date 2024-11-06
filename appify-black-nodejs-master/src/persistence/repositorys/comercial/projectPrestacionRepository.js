import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class ProjectPrestacionRepository{
    async createProjectPrestacion(data) {
        try {
            return prisma.direccion_de_prestacion_proyecto.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findProjectPrestacionById(id) {
        try {
            return prisma.direccion_de_prestacion_proyecto.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateProjectPrestacion(id, updateData) {
        try {
            return prisma.direccion_de_prestacion_proyecto.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteProjectPrestacion(id) {
        try {
            return prisma.direccion_de_prestacion_proyecto.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ProjectPrestacionRepository();