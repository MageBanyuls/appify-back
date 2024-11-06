import { prisma, prismaError } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../../utils/id/idGenerate.js";

class VentasRepository {
    createDocVentas (idDV, folio, {user}){
        try {
            return prisma.documento_venta.create({
                data: {
                    id: idDV,
                    user,
                    numero_documento: folio
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllDV() {
        return await prisma.documento_venta.findMany();
    }
    async getAllDD() {
        return await prisma.documento_despacho.findMany();
    }
    async getDVByUser(user) {
        try {
            return await prisma.documento_venta.findMany({
                where: {
                    user: user
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getDDByUser(user) {
        try {
            return await prisma.documento_despacho.findMany({
                where: {
                    user: user
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createDD (idDD, {user, venta, traslado}){
        try {
            return prisma.documento_despacho.create({
                data: {
                    id: idDD,
                    user,
                    venta,
                    traslado
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoDDV(idDDV, itemsProductoDDV) {
        try {
            const op = itemsProductoDDV.map(item => prisma.item_producto_documento_despacho_venta.create({
                data: {
                    id: idgenerate("DDV-PROD"),
                    idProducto: item.idProducto,
                    idDocumentoVenta: idDDV,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    costo_unitario: item.costo_unitario,
                    subtotal: item.subtotal,
                    iva: item.iva,
                    total_con_iva: item.total_con_iva
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemDespachoVentaOt(idDDV, itemsDVot) {
        try {
            const op = itemsDVot.map(item => prisma.item_despacho_venta_ot.create({
                data: {
                    id: idgenerate("DDV-OT"),
                    idOt: item.idOt,
                    idDespachoVenta: idDDV
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createDocDespachoVenta(idDDV, idDD, {fecha, idCliente, idTransportista, ot, fact_libre, punto, direccion_destino, comuna, ciudad, observacion, numero_documento}) {
        try {
            return prisma.documento_despacho_venta.create({
                data: {
                id: idDDV,
                idDoc: idDD,
                fecha,
                idCliente,
                idTransportista,
                ot,
                fact_libre,
                punto,
                direccion_destino,
                comuna,
                ciudad,
                observacion, 
                numero_documento
            }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createDDT(idDDT, idDD, {fecha, idCliente, idTransportista, punto, direccion_destino, comuna, ciudad, observacion, numero_documento, ot, fact_libre}) {
        try {
            return prisma.documento_despacho_traslado.create({
                data: {
                    id: idDDT,
                    idDoc: idDD,
                    fecha,
                    idCliente,
                    idTransportista,
                    punto,
                    direccion_destino,
                    comuna,
                    ciudad,
                    observacion,
                    numero_documento,
                    ot, 
                    fact_libre
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemDespachoTrasladoOt(idDDT, itemsDDTot) {
        try {
            const op = itemsDDTot.map(item => prisma.item_despacho_traslado_ot.create({
                data: {
                    id: idgenerate("DDT-OT"),
                    idOt: item.idOt,
                    idDespachoTraslado: idDDT
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoDDT(idDDV, itemsProductoDDT) {
        try {
            const op = itemsProductoDDT.map(item => prisma.item_producto_documento_despacho_traslado.create({
                data: {
                    id: idgenerate("DDT-PROD"),
                    idProducto: item.idProducto,
                    idDocumentoVenta: idDDV,
                    cantidad: item.cantidad,
                    unitario: item.unitario
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllFV(){
        try {
            const facturasConItemsYDocumentoVenta = await prisma.$queryRaw`SELECT
            dv.id AS DocumentoVentaID,
            fv.idCliente AS ClienteID,
            fv.idVendedor AS VendedorID,
            fv.fecha AS FechaFactura,
            SUM(isv.bruto) AS TotalBrutoServicio,
            SUM(isv.neto) AS TotalNetoServicio,
            SUM(ipv.bruto) AS TotalBrutoProducto,
            SUM(ipv.neto) AS TotalNetoProducto
        FROM
            factura_venta fv
            INNER JOIN documento_venta dv ON fv.idDoc = dv.id
            LEFT JOIN item_servicio_factura_venta isv ON fv.id = isv.idFactura
            LEFT JOIN item_producto_factura_venta ipv ON fv.id = ipv.idFactura
        GROUP BY
            fv.id, dv.id, fv.idCliente, fv.idVendedor, fv.fecha
        ORDER BY
            fv.fecha;
        `;
            return facturasConItemsYDocumentoVenta;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllFVE(){
        try {
            const facturasExentasConItemsYDocumentoVenta = await prisma.$queryRaw`SELECT
            dv.id AS DocumentoVentaID,
            fve.idCliente AS ClienteID,
            fve.idVendedor AS VendedorID,
            fve.fecha AS FechaFactura,
            SUM(isve.bruto) AS TotalBrutoServicio,
            SUM(isve.neto) AS TotalNetoServicio,
            SUM(ipve.bruto) AS TotalBrutoProducto,
            SUM(ipve.neto) AS TotalNetoProducto
        FROM
            factura_venta_excenta fve
            INNER JOIN documento_venta dv ON fve.idDoc = dv.id
            LEFT JOIN item_servicio_factura_venta_excenta isve ON fve.id = isve.idFactura
            LEFT JOIN item_producto_factura_venta_excenta ipve ON fve.id = ipve.idFactura
        GROUP BY
            fve.id, dv.id, fve.idCliente, fve.idVendedor, fve.fecha
        ORDER BY
            fve.fecha;
        `;
            return facturasExentasConItemsYDocumentoVenta;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async notaFVE_NCOD(NCOD){
        try {
            const notaFVE_NCOD = await prisma.$queryRaw`SELECT
            nf.id AS NotaFacturaVentaExentaID,
            nf.idFacturaVentaExcenta AS FacturaVentaExentaID,
            nf.idNotadeCD AS NotaDeCreditoID,
            fv.id AS FacturaVentaID,
            fv.idDoc AS DocumentoVentaID,
            fv.idCliente AS ClienteID,
            fv.tipo_documento AS TipoDocumento,
            fv.numero_documento AS NumeroDocumentoFV,
            fv.fecha AS FechaFactura,
            fv.idVendedor AS VendedorID,
            fv.condicion_de_pago AS CondicionPago,
            fv.centro_beneficio AS CentroBeneficio,
            fv.observacion AS Observacion,
            fv.nota_interna AS NotaInterna
        FROM
            nota_factura_venta_excenta nf
            INNER JOIN factura_venta_excenta fv ON nf.idFacturaVentaExcenta = fv.id
        WHERE
            nf.idNotadeCD = ${NCOD};`;
            return notaFVE_NCOD;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async notaDEncod_NCOD(NCOD){
        try {
            const notaDEncod_NCOD = await prisma.$queryRaw`SELECT
            ncd.id AS NotaCreditoDebitoID,
            ncd.idDoc AS DocumentoID,
            ncd.idCliente AS ClienteID,
            ncd.idVendedor AS VendedorID,
            ncd.tipo_credito AS TipoCredito,
            ncd.tipo_debito AS TipoDebito,
            ncd.numero_documento AS NumeroDocumento,
            ncd.fecha AS Fecha,
            ncd.motivo_referencia AS MotivoReferencia,
            ncd.centro_de_beneficio AS CentroDeBeneficio,
            ncd.observacion AS Observacion,
            ncd.nota_interna AS NotaInterna,
            ncd.anula_doc AS AnulaDocumento,
            ncd.corrige_monto AS CorrigeMonto,
            nc.id AS NotaCreditoID,
            nc.numero_documento AS NumeroDocumentoNC
        FROM
            notas_de_credito_debito ncd
            INNER JOIN nota_credito_nota_NC nc ON ncd.id = nc.idNotadeCD
        WHERE
            nc.idNotadeCD = ${NCOD};`;
            return notaDEncod_NCOD;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getItemsByFVId(fvID) {
        try {
            // Obtener servicios con nombre
            const servicios = (await prisma.$queryRaw`SELECT
                isv.idServicio,
                isv.codigo,
                isv.cantidad,
                isv.unitario,
                srv.nombre
            FROM
                factura_venta fv
                LEFT JOIN item_servicio_factura_venta isv ON fv.id = isv.idFactura
                LEFT JOIN servicios srv ON isv.idServicio = srv.id
            WHERE
                fv.id = ${fvID};`).filter(servicio => 
                    servicio.idServicio !== null && servicio.cantidad !== null && servicio.unitario !== null
                ); // Filtramos para asegurar que los campos clave no son null
            // Obtener productos con nombre
            const productos = (await prisma.$queryRaw`SELECT
                ipv.idProducto,
                ipv.codigo,
                ipv.cantidad,
                ipv.unitario,
                prd.nombre
            FROM
                factura_venta fv
                LEFT JOIN item_producto_factura_venta ipv ON fv.id = ipv.idFactura
                LEFT JOIN productos prd ON ipv.idProducto = prd.id
            WHERE
                fv.id = ${fvID};`).filter(producto => 
                    producto.idProducto !== null && producto.cantidad !== null && producto.unitario !== null
                ); // Filtramos para asegurar que los campos clave no son null
        return { servicios, productos };
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async getNameProdServByID(idServ, idProd){
        try {
            let response = {};
            if (idServ) {
                const servicio = await prisma.servicios.findFirst({
                    where: {
                        id: idServ
                    },
                    select: {
                        nombre: true 
                    }
                });
                if (servicio && servicio.nombre) {
                    response.servicio = servicio.nombre;
                }
            }
            if (idProd) {
                const producto = await prisma.productos.findFirst({
                    where: {
                        id: idProd
                    },
                    select: {
                        nombre: true 
                    }
                });
                if (producto && producto.nombre) {
                    response.producto = producto.nombre;
                }
            }
            // Devuelve response si tiene al menos un campo (servicio o producto), de lo contrario devuelve false
            return Object.keys(response).length ? response : false;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getItemsByFVEId(fvID) {
        try {
            // Obtener servicios con nombre
            const servicios = (await prisma.$queryRaw`SELECT
                isv.idServicio,
                isv.cantidad,
                isv.unitario,
                isv.codigo,
                srv.nombre
            FROM
                factura_venta_excenta fv
                LEFT JOIN item_servicio_factura_venta_excenta isv ON fv.id = isv.idFactura
                LEFT JOIN servicios srv ON isv.idServicio = srv.id
            WHERE
                fv.id = ${fvID};`).filter(servicio => 
                    servicio.idServicio !== null && servicio.cantidad !== null && servicio.unitario !== null
                ); 
            // Obtener productos con nombre
            const productos = (await prisma.$queryRaw`SELECT
                ipv.idProducto,
                ipv.cantidad,
                ipv.unitario,
                ipv.codigo,
                prd.nombre
            FROM
                factura_venta_excenta fv
                LEFT JOIN item_producto_factura_venta_excenta ipv ON fv.id = ipv.idFactura
                LEFT JOIN productos prd ON ipv.idProducto = prd.id
            WHERE
                fv.id = ${fvID};`).filter(producto => 
                    producto.idProducto !== null && producto.cantidad !== null && producto.unitario !== null
                ); 
            return { servicios, productos };
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async notaFV_NCOD(NCOD){
        try {
            const notaFV_NCOD = await prisma.$queryRaw`SELECT
            nf.id AS NotaFacturaVentaID,
            nf.idFacturaVenta AS FacturaVentaID,
            nf.idNotadeCD AS NotaDeCreditoID,
            fv.id AS FacturaVentaID,
            fv.idDoc AS DocumentoVentaID,
            fv.idCliente AS ClienteID,
            fv.tipo_documento AS TipoDocumento,
            fv.numero_documento AS NumeroDocumentoFV,
            fv.fecha AS FechaFactura,
            fv.idVendedor AS VendedorID,
            fv.condicion_de_pago AS CondicionPago,
            fv.centro_beneficio AS CentroBeneficio,
            fv.observacion AS Observacion,
            fv.nota_interna AS NotaInterna
        FROM
            nota_factura_venta nf
            INNER JOIN factura_venta fv ON nf.idFacturaVenta = fv.id
        WHERE
            nf.idNotadeCD = ${NCOD};`;
            return notaFV_NCOD;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getDocAsociadoByIdNCOD(NCOD){
        try {
            // Primera consulta: Notas de factura de venta
            const notaFV_NCOD = await prisma.$queryRaw`SELECT
            fv.id AS FacturaVentaID
            FROM
            nota_factura_venta nf
            INNER JOIN factura_venta fv ON nf.idFacturaVenta = fv.id
            WHERE
            nf.idNotadeCD = ${NCOD};`;
            if (notaFV_NCOD.length > 0) {
            return notaFV_NCOD[0].FacturaVentaID;
            }
            // Segunda consulta: Notas de factura de venta exenta
            const notaFVE_NCOD = await prisma.$queryRaw`SELECT
            fv.id AS FacturaVentaExentaID
            FROM
            nota_factura_venta_excenta nf
            INNER JOIN factura_venta_excenta fv ON nf.idFacturaVentaExcenta = fv.id
            WHERE
            nf.idNotadeCD = ${NCOD};`;
            if (notaFVE_NCOD.length > 0) {
            return notaFVE_NCOD[0].FacturaVentaExentaID;
            }
            // Tercera consulta: Notas de crédito débito
            const notaDEncod_NCOD = await prisma.$queryRaw`SELECT
            ncd.id AS NotaID
            FROM
            notas_de_credito_debito ncd
            INNER JOIN nota_credito_nota_NC nc ON ncd.id = nc.idNotadeCD
            WHERE
            nc.idNotadeCD = ${NCOD};`;
            if (notaDEncod_NCOD.length > 0) {
            return notaDEncod_NCOD[0].NotaID;
            }
            return false;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFVDetailsbyDV(fvDVID) {
        try {
            const DV = await prisma.$queryRaw`SELECT
            dv.id AS DocumentoVentaID,
            dv.user AS Usuario,
            dv.numero_documento AS NumeroDocumentoDV,
            fv.id AS FacturaVentaID,
            fv.idCliente AS ClienteID,
            fv.idVendedor AS VendedorID,
            fv.fecha AS FechaFactura,
            fv.tipo_documento AS TipoDocumento,
            fv.numero_documento AS NumeroDocumentoFV,
            fv.condicion_de_pago AS CondicionPago,
            fv.centro_beneficio AS CentroBeneficio,
            fv.observacion AS Observacion,
            fv.nota_interna AS NotaInterna,
            isv.id AS ItemServicioID,
            isv.idServicio,
            isv.codigo AS CodigoServicio,
            isv.cantidad AS CantidadServicio,
            isv.unitario AS PrecioUnitarioServicio,
            isv.bruto AS BrutoServicio,
            isv.neto AS NetoServicio,
            isv.bonificacion AS BonificacionServicio,
            isv.notas AS NotasServicio,
            ipv.id AS ItemProductoID,
            ipv.idProducto,
            ipv.codigo AS CodigoProducto,
            ipv.cantidad AS CantidadProducto,
            ipv.unitario AS PrecioUnitarioProducto,
            ipv.bruto AS BrutoProducto,
            ipv.neto AS NetoProducto,
            ipv.bonificacion AS BonificacionProducto,
            ipv.notas AS NotasProducto
            FROM
                documento_venta dv
                INNER JOIN factura_venta fv ON dv.id = fv.idDoc
                LEFT JOIN item_servicio_factura_venta isv ON fv.id = isv.idFactura
                LEFT JOIN item_producto_factura_venta ipv ON fv.id = ipv.idFactura
            WHERE
                dv.id = ${fvDVID};`;
            return DV;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getFV_DetailsDTE_byDV(DVID) {
        try {
            const DV = await prisma.$queryRaw`SELECT
            fv.id,
            fv.numero_documento,
            isv.idServicio,
            ipv.idProducto
            FROM
                documento_venta dv
                INNER JOIN factura_venta fv ON dv.id = fv.idDoc
                LEFT JOIN item_servicio_factura_venta isv ON fv.id = isv.idFactura
                LEFT JOIN item_producto_factura_venta ipv ON fv.id = ipv.idFactura
            WHERE
                dv.id = ${DVID};`;
            return DV;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getFVE_DetailsDTE_byDV(DVID) {
        try {
            const DV = await prisma.$queryRaw`SELECT
            fv.id,
            fv.numero_documento,
            isv.idServicio,
            ipv.idProducto
            FROM
                documento_venta dv
                INNER JOIN factura_venta_excenta fv ON dv.id = fv.idDoc
                LEFT JOIN item_servicio_factura_venta_excenta isv ON fv.id = isv.idFactura
                LEFT JOIN item_producto_factura_venta_excenta ipv ON fv.id = ipv.idFactura
            WHERE
                dv.id = ${DVID};`;
            return DV;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getNCoDbyIdDoc(DVID) {
        try {
            const notas = await prisma.notas_de_credito_debito.findMany({
                where: {
                  idDoc: DVID, // Filtra por el ID del documento de venta proporcionado
                },
            });
            return notas;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getNota_detailsDTE_ById(NCODid) {
        try {
            const notas = await prisma.notas_de_credito_debito.findUnique({
                where: {
                    id: NCODid,
                },
                select: {
                    numero_documento: true,
                    tipo_credito: true,
                    tipo_debito: true
                }
            });
            return notas ? notas : false;
        }catch(error){
            handlePrismaError(error)
        }
    }
    async getFVEDetailsbyDV(fveDVID) {
        try {
            const DV = await prisma.$queryRaw`SELECT
            dv.id AS DocumentoVentaID,
            dv.user AS Usuario,
            dv.numero_documento AS NumeroDocumentoDV,
            fv.id AS FacturaVentaID,
            fv.idCliente AS ClienteID,
            fv.idVendedor AS VendedorID,
            fv.fecha AS FechaFactura,
            fv.tipo_documento AS TipoDocumento,
            fv.numero_documento AS NumeroDocumentoFV,
            fv.condicion_de_pago AS CondicionPago,
            fv.centro_beneficio AS CentroBeneficio,
            fv.observacion AS Observacion,
            fv.nota_interna AS NotaInterna,
            isv.id AS ItemServicioID,
            isv.idServicio,
            isv.codigo AS CodigoServicio,
            isv.cantidad AS CantidadServicio,
            isv.unitario AS PrecioUnitarioServicio,
            isv.neto AS NetoServicio,
            isv.bonificacion AS BonificacionServicio,
            isv.notas AS NotasServicio,
            ipv.id AS ItemProductoID,
            ipv.idProducto,
            ipv.codigo AS CodigoProducto,
            ipv.cantidad AS CantidadProducto,
            ipv.unitario AS PrecioUnitarioProducto,
            ipv.neto AS NetoProducto,
            ipv.bonificacion AS BonificacionProducto,
            ipv.notas AS NotasProducto
        FROM
            documento_venta dv
            INNER JOIN factura_venta_excenta fv ON dv.id = fv.idDoc
            LEFT JOIN item_servicio_factura_venta_excenta isv ON fv.id = isv.idFactura
            LEFT JOIN item_producto_factura_venta_excenta ipv ON fv.id = ipv.idFactura
        WHERE
            dv.id = ${fveDVID};`;
            return DV;
        }catch(error){
            handlePrismaError(error)
        }
    }
    createFV (idFV,idDV, folio,{idCliente, tipo_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna, ot,neto,bruto, pagado}){
            try {
                return prisma.factura_venta.create({
                    data: {
                        id: idFV,
                        idDoc: idDV,
                        idCliente,
                        tipo_documento,
                        //numero que viene de SII
                        numero_documento: folio,
                        fecha,
                        idVendedor,
                        condicion_de_pago,
                        centro_beneficio,
                        observacion,
                        nota_interna,
                        neto,
                        bruto,
                        ot,
                        pagado
                    }
                })
            } catch (error) {
                handlePrismaError(error)
            }
    }
    async getFVidByIdDoc(idDoc){
        try {
            const facturaVenta = await prisma.factura_venta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaVenta ? facturaVenta.id : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFV_detailsDTE_ById(idFV){
        try {
            const facturaVenta = await prisma.factura_venta.findUnique({
                where: {
                    id: idFV
                },
                select: {
                    tipo_documento: true,
                    numero_documento: true
                }
            });
            return facturaVenta ? facturaVenta : false;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioFV (idFV,itemsServicio){
        try {
            const op = itemsServicio.map(item => prisma.item_servicio_factura_venta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFV,
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
    createItemProductoFV (idFV,itemsProducto){
        try {
            const operations = itemsProducto.map(item => prisma.item_producto_factura_venta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFV,
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
    createOTinFV (idFV,itemsOT){
        try {
            const op = itemsOT.map(item => prisma.orden_trabajo_FV.create({
                data: {
                    idOrdenT: item.idOrdenT,
                    idFacturaVenta: idFV
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createOTinFVE (idFVE,itemsOT){
        try {
            const op = itemsOT.map(item => prisma.orden_trabajo_FVE.create({
                data: {
                    idOrdenT: item.idOrdenT,
                    idFacturaVentaExcenta: idFVE
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createFVE (idFVE,idDV,{idCliente, tipo_documento,neto,bruto, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna, ot, pagado}){
        try {
            return prisma.factura_venta_excenta.create({
                data: {
                    id: idFVE,
                    idDoc: idDV,
                    idCliente,
                    tipo_documento,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    idVendedor,
                    condicion_de_pago,
                    neto,
                    bruto,
                    centro_beneficio,
                    observacion,
                    nota_interna,
                    ot,
                    pagado
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getFVEidByIdDoc(idDoc){
        try {
            const facturaVentaExenta = await prisma.factura_venta_excenta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaVentaExenta ? facturaVentaExenta.id : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    
    async getNotaFVE_detailsDTE_ById(idFVE){
        try {
            const facturaVentaExenta = await prisma.factura_venta_excenta.findFirst({
                where: {
                    id: idFVE
                },
                select: {
                    numero_documento: true 
                }
            });
            return facturaVentaExenta ? facturaVentaExenta : false;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioFVE (idFVE,itemsServicioFVE){
        try {
            const op = itemsServicioFVE.map(item => prisma.item_servicio_factura_venta_excenta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFVE,
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
    createItemProductoFVE (idFVE,itemsProductoFVE){
        try {
            const operations = itemsProductoFVE.map(item => prisma.item_producto_factura_venta_excenta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFVE,
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
    createNCoD (idNCoD,{idDoc,idCliente,idVendedor,tipo_credito,neto,bruto, tipo_debito, numero_documento,tipo_nota,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna, anula_doc, corrige_monto}){
        try {
            return prisma.notas_de_credito_debito.create({
                data: {
                    id: idNCoD,
                    //numero del documento a anular o cambiar items, numero de referencia al documento
                    idDoc,
                    idCliente,
                    idVendedor,
                    tipo_credito,
                    tipo_debito,
                    neto,
                    bruto,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
                    observacion,
                    nota_interna,
                    anula_doc,
                    corrige_monto
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaFV(idFV, idNCoD) {
        try {
            return prisma.nota_factura_venta.create({
                data: {
                    idFacturaVenta: idFV,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaFVE(idFVE, idNCoD) {
        try {
            return prisma.nota_factura_venta_excenta.create({
                data: {
                    //NUMERO DE LA FACTURA DE VENTA EXCENTA
                    idFacturaVentaExcenta: idFVE,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaNC({numero_documento, idNotadeCD}) {
        try {
            return prisma.nota_credito_nota_NC.create({
                data: {
                    //id de la nota de credito a anular
                    idNotadeCD,
                    //numero que viene del sii
                    numero_documento,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioForNCoD (idNCoD,itemsServicioNCoD){
        try {
            const op = itemsServicioNCoD.map(item => prisma.item_servicio_nota_credito.create({
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
    createItemProductoForNCoD (idNCoD,itemsProductoNCoD){
        try {
            const operations = itemsProductoNCoD.map(item => prisma.item_producto_nota_credito.create({
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
    createItemServicioForNCoD_NCOD (idNCoD,itemsServicioNCoD_NC){
        try {
            const op = itemsServicioNCoD_NC.map(item => prisma.item_servicio_nota_credito_NC.create({
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
            const operations = itemsProductoNCoD_NC.map(item => prisma.item_producto_nota_credito_NC.create({
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
    async getFVoFVEbyDC(idDocumentoVenta) {
        try {
            const response = await prisma.$queryRaw`
            (SELECT 
                'Factura Venta' as tipo, 
                id, 
                idDoc as idDoc
            FROM factura_venta
            WHERE idDoc = ${idDocumentoVenta}) 
            UNION ALL
            (SELECT 
                'Factura Venta Excenta' as tipo, 
                id, 
                idDoc
            FROM factura_venta_excenta
            WHERE idDoc = ${idDocumentoVenta})`;
            return response;
        }catch(error){
            handlePrismaError(error)
        }
    }
}
export default new VentasRepository()