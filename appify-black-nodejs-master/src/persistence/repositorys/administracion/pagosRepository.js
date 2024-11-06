import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";

class pagosRepository {
    async createPagos(data) {
        try {
            return await prisma.pagos.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createPagosFC(data) {
        try {
            return await prisma.pagos_factura_compra.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createPagosFCE(data) {
        try {
            return await prisma.pagos_factura_compra_excenta.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createPagosNC(data) {
        try {
            return await prisma.pagos_factura_nota_credito.create({ data });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findPagosById(id) {
        try {
            return await prisma.pagos.findUnique({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findPagosFCByPagoId(id) {
        try {
            return await prisma.pagos_factura_compra.findFirst({ where: { idPago: id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findPagosFCEByPagoId(id) {
        try {
            return await prisma.pagos_factura_compra_excenta.findFirst({ where: { idPago: id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findFCById(id) {
        try {
            return await prisma.factura_compra.findUnique({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findFCEById(id) {
        try {
            return await prisma.factura_compra_excenta.findUnique({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findFCNCById(id) {
        try {
            return await prisma.notas_de_credito_debito_compras.findUnique({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findPagosNCByPagoId(id) {
        try {
            return await prisma.pagos_factura_nota_credito.findFirst({ where: { idPago: id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllPagosByUserId(userId) {
        try {
            return await prisma.pagos.findMany({ where: { user: userId } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updatePagos(id, updateData) {
        try {
            return await prisma.pagos.update({ where: { id }, data: updateData });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updatePagosFC(id, updateData) {
        try {
            return await prisma.pagos_factura_compra.update({ where: { id }, data: updateData });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updatePagosNC(id, updateData) {
        try {
            return await prisma.pagos_factura_nota_credito.update({ where: { id }, data: updateData });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deletePagos(id) {
        try {
            return await prisma.pagos.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deletePagosFCByCobroId(id) {
        try {
            return await prisma.pagos_factura_compra.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deletePagosNCByCobroId(id) {
        try {
            return await prisma.pagos_factura_nota_credito.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new pagosRepository()