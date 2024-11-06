import { prisma } from "../../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../../utils/httpRes/handlePrismaError.js";

class ItemSistemaRepository {
    createSistema(empresaId, { pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar}) {
        try {
            return prisma.sistema.create({
                data: {
                    empresa: empresaId,
                    pais,
                    moneda, 
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createEmpresa(empresaId,{user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel}) {
        try {
            return prisma.empresa.create({
                data: {
                    id: empresaId,
                    user,
                    nombre, 
                    RUT
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateSistema(id, data) {
        try {
            return await prisma.sistema.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async deleteSistema(id) {
        try {
            return await prisma.sistema.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getEmpresaByRUT(rut) {
        try {
            return await prisma.empresa.findFirst({ 
                where: { 
                    RUT: rut 
                } 
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateEmpresa(id, data) {
        try {
            return await prisma.empresa.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async deleteEmpresa(id) {
        try {
            return await prisma.empresa.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getEmpresaYSistemaByUserId(userId) {
        try {
            const resultado = await prisma.$queryRaw`
            SELECT empresa.*, sistema.*
            FROM empresa
            JOIN sistema ON sistema.empresa = empresa.id
            WHERE empresa.user = ${userId};
            `;
        return resultado;
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new ItemSistemaRepository();