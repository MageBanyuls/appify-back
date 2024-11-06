import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma } from "../../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../../utils/httpRes/handlePrismaError.js";
class ComercialRepository {
    createProyecto(empresaId, {valor_impuesto, porcentaje_de_ot, texto_para_compartir_proyecto, cotizacion_descuento_visible, nombre_impuesto}) {
        try {
            return prisma.empresa_proyecto.create({
                data: {
                    empresa: empresaId,
                    cotizacion_descuento_visible, 
                    nombre_impuesto
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateProyecto(id, data) {
        try {
            return await prisma.empresa_proyecto.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async deleteProyecto(id) {
        try {
            return await prisma.empresa_proyecto.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //{texto_inferior_firma, mensaje_envio_proyecto, texto_confirmacion_compra}
    createParaClientes(empresaId) {
        try {
            return prisma.para_clientes_proyectos.create({
                data: {
                    empresa: empresaId,
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateParaClientes(id, data) {
        try {
            return await prisma.para_clientes_proyectos.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    getProyectoYParaClientes(empresaId) {
        try {
            const response = prisma.$queryRaw`SELECT
            ep.empresa AS EmpresaID,
            ep.valor_impuesto AS valor_impuesto,
            ep.logo AS logo,
            ep.porcentaje_de_ot AS porcentaje_de_ot,
            ep.texto_para_compartir_proyecto AS texto_para_compartir_proyecto,
            ep.cotizacion_descuento_visible AS cotizacion_descuento_visible,
            ep.nombre_impuesto AS nombre_impuesto,
            pcp.texto_inferior_firma AS texto_inferior_firma,
            pcp.mensaje_envio_proyecto AS mensaje_envio_proyecto,
            pcp.texto_confirmacion_compra AS texto_confirmacion_compra
            FROM
                empresa_proyecto ep
                INNER JOIN para_clientes_proyectos pcp ON ep.empresa = pcp.empresa
            WHERE
                pcp.empresa = ${empresaId};`
            return response
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new ComercialRepository()