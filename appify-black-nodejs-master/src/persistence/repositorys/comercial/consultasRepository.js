import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class ConsultasRepository{
    async createConsulta(data) {
        try {
            return prisma.consultas.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllConsultasByUserId(userId) {
        try {
            return prisma.consultas.findMany({
                where: { idVendedor: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateConsulta(id, updateData) {
        try {
            return prisma.consultas.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteConsulta(id) {
        try {
            return prisma.consultas.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ConsultasRepository();