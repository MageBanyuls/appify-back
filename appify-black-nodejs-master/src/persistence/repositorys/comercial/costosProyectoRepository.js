import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class costosCProyectoRepository{
    async createCosto(data) {
        try {
            return prisma.costos_por_proyecto.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCostosByProyectoId(id) {
        try {
            return prisma.costos_por_proyecto.findMany({
                where: { proyecto : id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCosto(id, updateData) {
        try {
            return prisma.costos_por_proyecto.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteCosto(id) {
        try {
            return prisma.costos_por_proyecto.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new costosCProyectoRepository();