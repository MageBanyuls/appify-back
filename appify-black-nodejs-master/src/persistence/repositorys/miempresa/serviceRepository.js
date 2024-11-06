import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
class ServiceRepository {
    async createService(data) {
        try {
            return prisma.servicios.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findServiceById(id) {
        try {
            return prisma.servicios.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    // Funcion para checkear que no exista el mismo servicio
    async serviceExistsByName(nameService, user) {
        try {
            const nombre = await prisma.servicios.findFirst({
                where: {
                    nombre : nameService,
                    user : user
                },
            })
            return nombre !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllServiciosByUserId(userId) {
        try {
            return prisma.servicios.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateServicios(id, updateData) {
        try {
            return prisma.servicios.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteService(id) {
        try {
            return prisma.servicios.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ServiceRepository();