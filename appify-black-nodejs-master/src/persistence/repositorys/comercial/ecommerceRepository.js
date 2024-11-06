import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class EcommerceRepository {
    async createEcommerce(data) {
        try {
            return prisma.e_commerce.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findEcommerceById(id) {
        try {
            return prisma.e_commerce.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    // Funcion para checkear que no exista el mismo servicio
    async ecommerceExistsByName(nameEcommerce) {
        try {
            const nombre = await prisma.e_commerce.findFirst({
                where: {
                    nombre : nameEcommerce,
                },
            })
            return nombre !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllEcommerceByUserId(userId) {
        try {
            return prisma.e_commerce.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllEcommerceByCategory(userId, category) {
        try {
            return prisma.e_commerce.findMany({
                where: { 
                user: userId,
                categoria: category
                }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateEcommerce(id, updateData) {
        try {
            return prisma.e_commerce.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteEcommerce(id) {
        try {
            return prisma.e_commerce.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new EcommerceRepository();