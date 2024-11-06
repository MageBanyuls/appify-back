import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
import { prisma } from "../../../utils/dependencys/injection.js"
class PriceListRepository {
    async findAllByUserId(userId) {
        try {
            const listas = await prisma.listas_de_precio.findMany({
                where: {
                    user: userId,
                },
            })
            return listas;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findByIdAndUserId(id, userId) {
        try {
            const lista = await prisma.listas_de_precio.findFirst({
                where: {
                    AND: [
                        { id: id},
                        { user: userId }
                    ],
                },
            })
            return lista
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createPriceList({ id, user, nombre, iva }) {
        try {
            const priceList = await prisma.listas_de_precio.create({
                data: {
                    id,
                    user,
                    nombre,
                    iva
                }
            })
            return priceList
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updatePriceList(id, { nombre, iva }) {
        try {
            await prisma.listas_de_precio.update({
                where: {
                    id
                },
                data: {
                    nombre,
                    iva
                }
            })
            return("Precio de productos actualizado")
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async deletePriceList(id) {
        try {
            await prisma.listas_de_precio.delete({
                where: {
                    id
                }
            })
            return("Producto eliminado de la lista exitosamente")
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new PriceListRepository();