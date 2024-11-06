import { response } from "express";
import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
import { idgenerate } from "../../../utils/id/idGenerate.js";
class comprasRepository {
    async getDCByUser(user) {
        try {
            return await prisma.documento_compra.findMany({
                where: {
                    user: user
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllDC() {
        return await prisma.documento_compra.findMany();
    }
    createDocCompras (idDC, {user, numero_documento}){
        try {
            return prisma.documento_compra.create({
                data: {
                    id: idDC,
                    user,
                    numero_documento
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createFC (idFC,idDC,{ proveedor,neto, bruto,tipo_documento,numero_documento, fecha, condicion_de_pago, cuenta, notas}){
        try {
            return prisma.factura_compra.create({
                data: {
                    id: idFC,
                    idDocCompra: idDC,
                    proveedor,
                    tipo_documento,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    neto,
                    bruto,
                    condicion_de_pago,
                    cuenta,
                    notas,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFCidByIdDoc(idDocCompra){
        try {
            const facturaCompra = await prisma.factura_compra.findFirst({
                where: {
                    idDocCompra: idDocCompra
                },
                select: {
                    id: true 
                }
            });
            return facturaCompra ? facturaCompra.id : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFCEidByIdDoc(idDoc){
        try {
            const facturaCompraExenta = await prisma.factura_compra_excenta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaCompraExenta ? facturaCompraExenta.id : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioFC (idFC,itemsServicio){
        try {
            const op = itemsServicio.map(item => prisma.item_servicio_factura_compra.create({
                data: {
                    idServicio: item.idServicio,
                    idFacturaCompra: idFC,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                    neto: item.neto,
                    subtotal: item.subtotal,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoFC (idFC,itemsProducto){
        try {
            const operations = itemsProducto.map(item => prisma.item_producto_factura_compra.create({
                data: {
                    idProducto: item.idProducto,
                    idFacturaCompra: idFC,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaFC(idFC, idNCoD) {
        try {
            return prisma.nota_factura_compra.create({
                data: {
                    idFacturaCompra: idFC,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaFCE(idFCE, idNCoD) {
        try {
            return prisma.nota_factura_compra_excenta.create({
                data: {
                    //NUMERO DE LA FACTURA DE COMPRA EXCENTA
                    idFacturaCompraExenta: idFCE,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaNC(idNotadeCD_anular, idNCoD) {
        try {
            return prisma.nota_credito_nota_NC_compra.create({
                data: {
                    //referencia a la nota de credito hecha
                    idNotadeCD: idNCoD,
                    //id de la nota de credito a anular
                    idNotadeCD_anular,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNCoD_Compras (idNCoD,{idDoc,idProveedor,idVendedor,tipo_credito,neto,bruto, tipo_debito, numero_documento,tipo_nota,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna, anula_doc, corrige_monto}){
        try {
            return prisma.notas_de_credito_debito_compras.create({
                data: {
                    id: idNCoD,
                    //numero del documento a anular o cambiar items, numero de referencia al documento
                    idDoc,
                    idProveedor,
                    idVendedor,
                    neto,
                    bruto,
                    tipo_credito,
                    tipo_debito,
                    anula_doc,
                    corrige_monto,
                    //numero que viene de SII
                    numero_documento,
                    tipo_nota,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
                    observacion,
                    nota_interna
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getNCoDComprasbyIdDoc(DCID) {
        try {
            const notas = await prisma.notas_de_credito_debito_compras.findMany({
                where: {
                  idDoc: DCID, // Filtra por el ID del documento de compra proporcionado
                },
            });
            return notas;
        }catch(error){
            handlePrismaError(error)
        }
    }
    createFCE (idFCE,idDC,{idProveedor,neto,bruto, tipo_documento, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
        try {
            return prisma.factura_compra_excenta.create({
                data: {
                    id: idFCE,
                    idDoc: idDC,
                    idProveedor,
                    tipo_documento,
                    neto,
                    bruto,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    idVendedor,
                    condicion_de_pago,
                    centro_beneficio,
                    observacion,
                    nota_interna
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioFCE (idFCE,itemsServicioFCE){
        try {
            const op = itemsServicioFCE.map(item => prisma.item_servicio_factura_compra_excenta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFCE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoFCE (idFCE,itemsProductoFCE){
        try {
            const operations = itemsProductoFCE.map(item => prisma.item_producto_factura_compra_excenta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFCE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioForNCoD (idNCoD,itemsServicioNCoD){
        try {
            const op = itemsServicioNCoD.map(item => prisma.item_servicio_nota_credito_compra.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCD: idNCoD,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                    neto: item.neto,
                    subtotal: item.subtotal,
                    iva: item.iva,
                    total: item.total,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoForNCoD (idNCoD,itemsProductoNCoD){
        try {
            const operations = itemsProductoNCoD.map(item => prisma.item_producto_nota_credito_compra.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCD: idNCoD,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                    neto: item.neto,
                    subtotal: item.subtotal,
                    iva: item.iva,
                    total: item.total,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioForNCoD_NCOD (idNCoD,itemsServicioNCoD_NC){
        try {
            const op = itemsServicioNCoD_NC.map(item => prisma.item_servicio_nota_credito_NC_compra.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoForNCoD_NCOD (idNCoD,itemsProductoNCoD_NC){
        try {
            const operations = itemsProductoNCoD_NC.map(item => prisma.item_producto_nota_credito_NC_compra.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFCDetailsbyDC(fcDCID) {
        try {
            const DC = await prisma.$queryRaw`SELECT
            dc.id AS DocumentoCompraID,
            dc.user AS Usuario,
            dc.numero_documento AS NumeroDocumentoDC,
            fc.id AS FacturaCompraID,
            fc.idDocCompra AS idDocCompraAsociado,
            fc.proveedor AS ProveedorIDAsociado,
            fc.fecha AS FechaFactura,
            fc.tipo_documento AS TipoDocumento,
            fc.numero_documento AS NumeroDocumento,
            fc.condicion_de_pago AS CondicionPago,
            fc.cuenta AS CuentaAsociada,
            fc.notas AS Notas,
            isc.id AS ItemServicioID,
            isc.idServicio AS IdServicioAsociado,
            isc.idFacturaCompra AS FacturaCompraAsociada,
            isc.cantidad AS CantidadServicio,
            isc.unitario AS PrecioUnitarioServicio,
            isc.cuenta AS Cuenta,
            isc.neto AS NetoServicio,
            isc.subtotal AS Subtotal,
            ipc.id AS ItemProductoID,
            ipc.idProducto AS idProductoAsociado,
            ipc.idFacturaCompra AS idFacturaCompraAsociada,
            ipc.cantidad AS CantidadProducto,
            ipc.unitario AS PrecioUnitarioProducto,
            ipc.cuenta AS CuentaAsociada
            FROM
                documento_compra dc
                INNER JOIN factura_compra fc ON dc.id = fc.idDocCompra
                LEFT JOIN item_servicio_factura_compra isc ON fc.id = isc.idFacturaCompra
                LEFT JOIN item_producto_factura_compra ipc ON fc.id = ipc.idFacturaCompra
            WHERE
                dc.id = ${fcDCID};`;
            return DC;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getFCoFCEbyDC(idDocumentoCompra) {
        try {
            const response = await prisma.$queryRaw`
            (SELECT 
                'Factura Compra' as tipo, 
                id, 
                idDocCompra as idDoc,
                proveedor, 
                tipo_documento, 
                numero_documento, 
                fecha, 
                condicion_de_pago,
                cuenta,
                notas
            FROM factura_compra
            WHERE idDocCompra = ${idDocumentoCompra})
            
            UNION ALL
            
            (SELECT 
                'Factura Compra Excenta' as tipo, 
                id, 
                idDoc,
                idProveedor as proveedor,
                tipo_documento,
                numero_documento,
                fecha,
                condicion_de_pago,
                centro_beneficio as cuenta,
                nota_interna as notas
            FROM factura_compra_excenta
            WHERE idDoc = ${idDocumentoCompra})`;
            return response;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getFCEDetailsbyDC(fceDCID) {
        try {
            const DC = await prisma.$queryRaw`SELECT
            dc.id AS DocumentoCompraID,
            dc.user AS Usuario,
            dc.numero_documento AS NumeroDocumentoDC,
            fce.id AS FacturaCompraID,
            fce.idDoc AS idDocCompraAsociado,
            fce.idProveedor AS ProveedorIDAsociado,
            fce.tipo_documento AS TipoDocumento,
            fce.numero_documento AS NumeroDocumento,
            fce.fecha AS FechaFactura,
            fce.idVendedor AS idVendedorAsociado,
            fce.condicion_de_pago AS CondicionPago,
            fce.centro_beneficio AS CentroBeneficio,
            fce.observacion AS Observacion,
            fce.nota_interna AS nota_interna,
            isc.id AS ItemServicioID,
            isc.idServicio AS IdServicioAsociado,
            isc.idFactura AS FacturaCompraExentaAsociada,
            isc.codigo AS CodigoServicio,
            isc.cantidad AS CantidadServicio,
            isc.unitario AS PrecioUnitarioServicio,
            isc.neto AS NetoServicio,
            isc.cuenta AS Cuenta,
            isc.bonificacion AS Bonificacion,
            isc.notas AS Notas,
            
            ipc.id AS ItemProductoID,
            ipc.idProducto AS IdProductoAsociado,
            ipc.idFactura AS FacturaCompraExentaAsociada,
            ipc.codigo AS CodigoServicio,
            ipc.cantidad AS CantidadServicio,
            ipc.unitario AS PrecioUnitarioServicio,
            ipc.neto AS NetoServicio,
            ipc.cuenta AS Cuenta,
            ipc.bonificacion AS Bonificacion,
            ipc.notas AS Notas
            FROM
                documento_compra dc
                INNER JOIN factura_compra_excenta fce ON dc.id = fce.idDoc
                LEFT JOIN item_servicio_factura_compra_excenta isc ON fce.id = isc.idFactura
                LEFT JOIN item_producto_factura_compra_excenta ipc ON fce.id = ipc.idFactura
            WHERE
                dc.id = ${fceDCID};`;
            return DC;
        }catch(error){
            console.log(error)
            handlePrismaError(error)
        }
    }
    async getNCODDetailsbyDC(DCID) {
        try {
            const NCOD = await prisma.$queryRaw`SELECT
            dc.id AS DocumentoCompraID,
            dc.user AS Usuario,
            dc.numero_documento AS NumeroDocumentoDC,
            nc.id AS NotadeCreditoODebitoID,
            nc.idDoc AS DocumentoCompraAsociado,
            nc.idProveedor AS ProveedorIDAsociado,
            nc.idVendedor AS VendedorID,
            nc.tipo_credito AS TipoCredito,
            nc.tipo_debito AS TipoDebito,
            nc.anula_doc AS AnulaDoc,
            nc.corrige_monto AS CorrigeMonto,
            nc.numero_documento AS NumeroDocumentoSII,
            nc.tipo_nota AS tipoNota,
            nc.fecha AS FechaNCoD,
            nc.motivo_referencia AS MotivoReferencia,
            nc.centro_de_beneficio AS CentroBeneficio,
            nc.observacion AS Observacion,
            nc.nota_interna AS NotaInterna
        FROM
            documento_compra dc
            INNER JOIN notas_de_credito_debito_compras nc ON dc.id = nc.idDoc
        WHERE
            dc.id = ${DCID};`;
            return NCOD;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async notaFC_NCOD(NCOD){
        try {
            const notaFC_NCOD = await prisma.$queryRaw`SELECT
            nfc.id AS NotaFacturaCompraID,
            nfc.idFacturaCompra AS FacturaCompraAsociada,
            nfc.idNotadeCD AS NotaDeCreditoAsociadaID,
            fc.id AS FacturaCompraID,
            fc.idDocCompra AS DocumentoCompraID,
            fc.proveedor AS ProveedorID,
            fc.tipo_documento AS TipoDocumento,
            fc.numero_documento AS NumeroDocumentoSII,
            fc.fecha AS FechaFactura,
            fc.condicion_de_pago AS CondicionPago,
            fc.cuenta AS Cuenta,
            fc.notas AS Notas
        FROM
            nota_factura_compra nfc
            INNER JOIN factura_compra fc ON nfc.idFacturaCompra = fc.id
        WHERE
            nfc.idNotadeCD = ${NCOD};`;
            return notaFC_NCOD;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async notaFCE_NCOD(NCOD){
        try {
            console.log(NCOD)
            const notaFCE_NCOD = await prisma.$queryRaw`SELECT
            nfc.id AS NotaID,
            nfc.idFacturaCompraExenta AS FCEAsociada,
            nfc.idNotadeCD AS NotaDeCreditoAsociadaID,
            fc.id AS FCEID,
            fc.idDoc AS DocumentoCompraID,
            fc.idProveedor AS ProveedorID,
            fc.tipo_documento AS TipoDocumento,
            fc.numero_documento AS NumeroDocumentoSII,
            fc.fecha AS FechaFactura,
            fc.idVendedor AS VendedorID,
            fc.condicion_de_pago AS CondicionPago,
            fc.centro_beneficio AS CentroBeneficio,
            fc.observacion AS Observacion,
            fc.nota_interna AS NotaInterna
        FROM
            nota_factura_compra_excenta nfc
            INNER JOIN factura_compra_excenta fc ON nfc.idFacturaCompraExenta = fc.id
        WHERE
            nfc.idNotadeCD = ${NCOD};`;
            console.log(notaFCE_NCOD)
            return notaFCE_NCOD;
        } catch (error) {
            console.log(NCOD)
            handlePrismaError(error)
        }
    }
    async notaDEncod_NCOD(NCOD){
        try {
            const notaDEncod_NCOD = await prisma.$queryRaw`SELECT
            ncnc.id AS NotaID,
            ncnc.idNotadeCD AS NCAsociada,
            ncnc.idNotadeCD_anular AS NotaDeCreditoAsociadaID,
            nc.id AS NCoDID,
            nc.idDoc AS DocumentoCompraID,
            nc.idProveedor AS ProveedorID,
            nc.idVendedor AS vendedorID,
            nc.tipo_credito AS TipoCredito,
            nc.tipo_debito AS TipoDebito,
            nc.anula_doc AS AnulaDoc,
            nc.corrige_monto AS CorrigeMonto,
            nc.numero_documento AS NumeroDocumentoSII,
            nc.tipo_nota AS TipoNota,
            nc.fecha AS FechaFactura,
            nc.motivo_referencia AS MotivoReferencia,
            nc.centro_de_beneficio AS CentroBeneficio,
            nc.observacion AS Observacion,
            nc.nota_interna AS NotaInterna
        FROM
            nota_credito_nota_NC_compra ncnc
            INNER JOIN notas_de_credito_debito_compras nc ON ncnc.idNotadeCD = nc.id
        WHERE
            ncnc.idNotadeCD = ${NCOD};`;
            return notaDEncod_NCOD;
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new comprasRepository();