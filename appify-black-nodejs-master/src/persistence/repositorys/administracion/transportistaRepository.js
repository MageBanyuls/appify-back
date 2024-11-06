import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
class TransportistaRepository {
    async createTransportista(data) {
        try {
            return prisma.transportista.create({
                data: data
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findTransportistaById(id) {
        try {
            return prisma.transportista.findUnique({
                where: { id: id }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllTransportistasByUserId(userId) {
        try {
            return prisma.transportista.findMany({
                where: { iduser: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateTransportista(id, updateData) {
        try {
            return prisma.transportista.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteTransportista(id) {
        try {
            return prisma.transportista.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new TransportistaRepository();