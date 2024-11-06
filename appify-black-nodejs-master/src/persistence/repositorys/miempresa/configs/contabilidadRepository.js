import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../../utils/httpRes/handlePrismaError.js";
class ContabilidadRepository {
    //{recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra}
    createFE(empresaId) {
        try {
            return prisma.facturacion_electronica.create({
                data: {
                    empresa: empresaId,
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateFE(id, data) {
        try {
            return await prisma.facturacion_electronica.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async deleteFE(id) {
        try {
            return await prisma.facturacion_electronica.delete({ where: { id } });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //{asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3}
    createCobranza(empresaId) {
        try {
            return prisma.cobranzas.create({
                data: {
                    empresa: empresaId,
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async updateCobranza(id, data) {
        try {
            return await prisma.cobranzas.update({
                where: { id },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //{cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico}
    createModuloAdm(empresaId) {
        return ()=>{
            try {
                return prisma.administracion_impuesto.create({
                    data: {
                        empresa: empresaId,
                    }
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    updateModuloAdm(id, data) {
        return () =>{
            try {
                return prisma.administracion_impuesto.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    //{cuenta_anticipo_clientes, cuenta_anticipo_proveedores, cuenta_balance_apertura, cuenta_ajuste_cambario, cuenta_boton_pago, cuenta_beneficios_defecto}
    createAdmAnticipo(empresaId) {
        return ()=>{
            try {
                return prisma.administracion_anticipo.create({
                    data: {
                        empresa: empresaId,
                    }
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    updateAdmAnticipo(id, data) {
        return () =>{
            try {
                return prisma.administracion_anticipo.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    //{cuenta_documentos_pendientes_clasificar}
    createAdmPorClasificar(empresaId) {
        return ()=> {
            try {
                return prisma.administracion_por_clasificar.create({
                    data: {
                        empresa: empresaId,
                    }
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    updateAdmPorClasificar(id, data) {
        return ()=>{
            try {
                return prisma.administracion_por_clasificar.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    //{cuenta_facturas_por_cobrar, cuenta_documentos_en_cartera_por_cobrar}
    createAdmPorCobrar(empresaId) {
        return ()=>{
            try {
                return prisma.administracion_por_cobrar.create({
                    data: {
                        empresa: empresaId,
                    }
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    updateAdmPorCobrar(id, data) {
        return ()=>{
            try {
                return prisma.administracion_por_cobrar.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    //{cuenta_honorarios_por_pagar, cuenta_facturas_por_pagar, cuenta_vouchers_por_pagar, cuenta_documentos_por_pagar}
    createAdmPorPagar(empresaId) {
        return ()=>{
            try {
                return prisma.administracion_por_pagar.create({
                    data: {
                        empresa: empresaId,
                    }
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    updateAdmPorPagar(id, data) {
        return ()=>{
            try {
                return prisma.administracion_por_pagar.update({
                    where: { id },
                    data,
                });
            } catch (error) {
                handlePrismaError(error)
            }
        }
    }
    getAllItemsContabilidad(empresaId) {
        try {
            const response = prisma.$queryRaw`SELECT
            fe.empresa AS EmpresaID,
            fe.recibir_doc_libre_DTE_automatico AS recibir_doc_libre_DTE_automatico,
            fe.contrasena_sii AS contrasena_sii,
            fe.folio_factura_excenta AS folio_factura_excenta,
            fe.folio_facura AS folio_facura,
            fe.folio_factura_compra AS folio_factura_compra,
            fe.folio_nota_debito AS folio_nota_debito,
            fe.folio_nota_credito AS folio_nota_credito,
            fe.folio_guia_despacho AS folio_guia_despacho,
            fe.folio_boleta_excenta AS folio_boleta_excenta,
            fe.folio_boleta_fisica AS folio_boleta_fisica,
            fe.folio_boleta_electronica AS folio_boleta_electronica,
            fe.set_factura_basica AS set_factura_basica,
            fe.set_boletas AS set_boletas,
            fe.set_facturas_exportacion AS set_facturas_exportacion,
            fe.set_facturas_compra AS set_facturas_compra,
            co.asunto AS asunto,
            co.mensaje_nivel_1 AS mensaje_nivel_1,
            co.mensaje_nivel_2 AS mensaje_nivel_2,
            co.mensaje_nivel_3 AS mensaje_nivel_3,
            ai.cuenta_impuesto_debito AS cuenta_impuesto_debito,
            ai.cuenta_impuesto_credito AS cuenta_impuesto_credito,
            ai.valor_impuesto_retenido AS valor_impuesto_retenido,
            ai.cuenta_impuesto_no_recuperable AS plazo_no_recuperable,
            ai.plazo_no_recuperable AS plazo_no_recuperable,
            ai.cuenta_retencion_impuesto AS cuenta_retencion_impuesto,
            ai.cuenta_impuesto_especifico AS cuenta_impuesto_especifico,
            aa.cuenta_anticipo_clientes AS cuenta_anticipo_clientes,
            aa.cuenta_anticipo_proveedores AS cuenta_anticipo_proveedores,
            aa.cuenta_balance_apertura AS cuenta_balance_apertura,
            aa.cuenta_ajuste_cambario AS cuenta_ajuste_cambario,
            aa.cuenta_boton_pago AS cuenta_boton_pago,
            aa.cuenta_beneficios_defecto AS cuenta_beneficios_defecto,
            apc.cuenta_documentos_pendientes_clasificar AS cuenta_documentos_pendientes_clasificar,
            apco.cuenta_facturas_por_cobrar AS cuenta_facturas_por_cobrar,
            apco.cuenta_documentos_en_cartera_por_cobrar AS cuenta_documentos_en_cartera_por_cobrar,
            app.cuenta_honorarios_por_pagar AS cuenta_honorarios_por_pagar,
            app.cuenta_facturas_por_pagar AS cuenta_facturas_por_pagar,
            app.cuenta_vouchers_por_pagar AS cuenta_vouchers_por_pagar,
            app.cuenta_documentos_por_pagar AS cuenta_documentos_por_pagar
            FROM
            facturacion_electronica fe
                INNER JOIN cobranzas co ON fe.empresa = co.empresa
                INNER JOIN administracion_impuesto ai ON fe.empresa = ai.empresa
                INNER JOIN administracion_anticipo aa ON fe.empresa = aa.empresa
                INNER JOIN administracion_por_clasificar apc ON fe.empresa = apc.empresa
                INNER JOIN administracion_por_cobrar apco ON fe.empresa = apco.empresa
                INNER JOIN administracion_por_pagar app ON fe.empresa = app.empresa
            WHERE
                fe.empresa = ${empresaId};`
        return response
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new ContabilidadRepository()