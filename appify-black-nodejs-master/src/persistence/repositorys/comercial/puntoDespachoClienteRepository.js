import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class puntoDespachoClienteRepository{
    async createPuntoDespacho(data) {
        try {
            return prisma.puntos_de_despacho_por_cliente.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllPuntosDespachoByClienteId(id) {
        try {
            return prisma.puntos_de_despacho_por_cliente.findMany({
                where: { cliente: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updatePuntoDespacho(id, updateData) {
        try {
            return prisma.puntos_de_despacho_por_cliente.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deletePuntoDespacho(id) {
        try {
            return prisma.puntos_de_despacho_por_cliente.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new puntoDespachoClienteRepository();