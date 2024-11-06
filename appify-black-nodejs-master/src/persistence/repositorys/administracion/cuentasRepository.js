import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class cuentasRepository {
    async createCuentaBanco(data) {
        try {
            return prisma.cuentas_banco.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createCuentaBancoConciliacion(data) {
        try {
            return prisma.cuenta_banco_conciliacion.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createCategoriaCuenta(data) {
        try {
            return prisma.categoria_cuenta.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createCuentaTipoDocumento(data) {
        try {
            return prisma.cuenta_tipo_documento.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createBanco(data) {
        try {
            return prisma.bancos.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createCondicionPago(data) {
        try {
            return prisma.condicion_pago.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async createCondicionesCondicionPago(data) {
        try {
            return prisma.condiciones_condicion_pago.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findCuentaBancoById(id) {
        try {
            return prisma.cuentas_banco.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findCuentaBancoConciliacionById(id) {
        try {
            return prisma.cuenta_banco_conciliacion.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findCategoriaCuentaById(id) {
        try {
            return prisma.categoria_cuenta.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findCuentaTipodocumentoById(id) {
        try {
            return prisma.cuenta_tipo_documento.findUnique({
                where: { id: id }
            });    
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findBancoById(id) {
        try {
            return prisma.bancos.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findCondicionPagoById(id) {
        try {
            return prisma.condicion_pago.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findCondicionesCondicionPagoById(id) {
        try {
            return prisma.condiciones_condicion_pago.findFirst({
                where: { idCondicion: id }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCuentasBancoByUserId(userId) {
        try {
            return prisma.cuentas_banco.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCuentasBancoConciliacionByUserId(userId) {
        try {
            return prisma.cuenta_banco_conciliacion.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCategoriasCuentaByUserId(userId) {
        try {
            return prisma.categoria_cuenta.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCuentaTipoDocumentoByUserId(userId) {
        try {
            return prisma.cuenta_tipo_documento.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllBancosByUserId(userId) {
        try {
            return prisma.bancos.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllCondicionPagoByUserId(userId) {
        try {
            return prisma.condicion_pago.findMany({
                where: { user: userId }
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCuentasBanco(id, updateData) {
        try {
            return prisma.cuentas_banco.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCategoriaCuenta(id, updateData) {
        try {
            return prisma.categoria_cuenta.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCuentaTipoDoc(id, updateData) {
        try {
            return prisma.cuenta_tipo_documento.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateBanco(id, updateData) {
        try {
            return prisma.bancos.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCondicionPago(id, updateData) {
        try {
            return prisma.condicion_pago.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCondicionesCondicionPago(id, updateData) {
        try {
            return prisma.condiciones_condicion_pago.update({
                where: { id: id },
                data: updateData
            });    
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new cuentasRepository()