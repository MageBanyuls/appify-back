import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class itemsProdServProyectosRepository{
    async createProductItem(data) {
        try {
            return prisma.item_producto_proyecto.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findProductByIdProyecto(id) {
        try {
            return prisma.item_producto_proyecto.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllProductosByProyectId(id) {
        try {
            return prisma.item_producto_proyecto.findMany({
                where: { idProyecto: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateProductItem(id, updateData) {
        try {
            return prisma.item_producto_proyecto.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteProductItem(id) {
        try {
            return prisma.item_producto_proyecto.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createServiceItem(data) {
        try {
            return prisma.item_servicio_proyecto.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findServiceById(id) {
        try {
            return prisma.item_servicio_proyecto.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllServiciosByServiceId(serviceId) {
        try {
            return prisma.item_servicio_proyecto.findMany({
                where: { idProyecto: serviceId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateServiceItem(id, updateData) {
        try {
            return prisma.item_servicio_proyecto.update({
                where: { id : id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteServiceItem(id) {
        try {
            return prisma.item_servicio_proyecto.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new itemsProdServProyectosRepository();