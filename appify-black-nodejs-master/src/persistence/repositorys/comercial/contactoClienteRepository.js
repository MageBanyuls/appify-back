import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class contactoClienteRepository{
    async createContacto(data) {
        try {
            return prisma.contactos_por_cliente.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllContactosByClienteId(id) {
        try {
            return prisma.contactos_por_cliente.findMany({
                where: { cliente: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateContacto(id, updateData) {
        try {
            return prisma.contactos_por_cliente.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteContacto(id) {
        try {
            return prisma.contactos_por_cliente.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new contactoClienteRepository();