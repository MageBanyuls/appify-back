import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class anticiposClienteProvRepository{
    async createAnticipoCliente(data) {
        try {
            return await prisma.anticipos_cliente.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllAnticiposCienteByProyectoId(id) {
        try {
            return await prisma.anticipos_cliente.findMany({ where: { idProyecto: id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateAnticipoCliente(id, updateData) {
        try {
            return await prisma.anticipos_cliente.update({ where: { id }, data: updateData });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteAnticipoCliente(id) {
        try {
            return await prisma.anticipos_cliente.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createAnticipoProveedor(data) {
        try {
            return await prisma.anticipos_proveedor.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllAnticiposProveedorByProyectoId(id) {
        try {
            return await prisma.anticipos_proveedor.findMany({ where: { idProyecto: id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateAnticipoProveedor(id, updateData) {
        try {
            return await prisma.anticipos_proveedor.update({ where: { id }, data: updateData });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteAnticipoProveedor(id) {
        try {
            return await prisma.anticipos_proveedor.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new anticiposClienteProvRepository();