import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import comprasRepository from "../../persistence/repositorys/administracion/comprasRepository.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ComprasService {
    async getAllDocCompra(){
        try {
            return await comprasRepository.getAllDC();
        } catch (error) {
            throw error
        }
    }
    async getDCByUser(user){
        try {
            if (!user) {
                throw new CustomError(400, "Bad Request", "El usuario no puede estar vacío");
            }
            return await comprasRepository.getDCByUser(user);
        } catch (error) {
            throw error
        }
    }
    async getFCoFCEbyDC(idDocumentoCompra){
        try {
            if (!idDocumentoCompra) {
                throw new CustomError(400, "Bad Request", "falta el id de su documento de compra");
            }
            const fc_fce = await comprasRepository.getFCoFCEbyDC(idDocumentoCompra);
            const facturas = [];
            let tipoFactura;
            // Añadiendo una verificación para determinar el tipo de factura
            fc_fce.forEach(factura => {
                if (factura.id.startsWith('FCE-')) {
                    tipoFactura = "FCE";
                } else if (factura.id.startsWith('FC-')) {
                    tipoFactura = "FC";
                } else {
                    tipoFactura = "Desconocido";
                }
                // Creando un objeto para cada factura y agregándolo al array
                facturas.push({
                    id: factura.id,
                    tipo: tipoFactura
                });
            });
        } catch (error) {
            throw error
        }
    }
    async createFC(data) {
        try {
            const {
                documento_compra,
                factura_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_compra && !item_producto_factura_compra){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de compra")
            }
            const idFC = idgenerate("FC")
            const idDC = idgenerate("DC")
            let operations = []
            operations.push(comprasRepository.createDocCompras(idDC, documento_compra));
            operations.push(comprasRepository.createFC(idFC, idDC, factura_compra ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_compra && item_servicio_factura_compra.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = comprasRepository.createItemServicioFC(idFC, item_servicio_factura_compra);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_compra && item_producto_factura_compra.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = comprasRepository.createItemProductoFC(idFC, item_producto_factura_compra);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FC completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createFCE(data) {
        try {
            const {
                documento_compra,
                factura_compra_excenta,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_compra_excenta && !item_producto_factura_compra_excenta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de compra exenta")
            }
            const idFCE = idgenerate("FCE")
            const idDC = idgenerate("DC")
            let operations = []
            operations.push(comprasRepository.createDocCompras(idDC, documento_compra));
            operations.push(comprasRepository.createFCE(idFCE, idDC, factura_compra_excenta ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_compra_excenta && item_servicio_factura_compra_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = comprasRepository.createItemServicioFCE(idFCE, item_servicio_factura_compra_excenta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_compra_excenta && item_producto_factura_compra_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = comprasRepository.createItemProductoFCE(idFCE, item_producto_factura_compra_excenta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FCE completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoDyItems(data) {
        try {
            const {
                notas_de_credito_debito_compras,
                nota_factura_compra,
                nota_factura_compra_excenta,
                nota_credito_nota_NC_compra,
                item_servicio_nota_credito_compra,
                item_producto_nota_credito_compra,
                item_servicio_nota_credito_NC_compra,
                item_producto_nota_credito_NC_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta
            } = data;
            let idNCoD;
            if(notas_de_credito_debito_compras.tipo_debito === true){
                idNCoD = idgenerate("ND")
            } else {
                idNCoD = idgenerate("NC")
            }
            if (notas_de_credito_debito_compras.anula_doc === true && notas_de_credito_debito_compras.corrige_monto === true) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: anular o corregir el documento");} 
            else if (notas_de_credito_debito_compras.anula_doc === true) {
                return await this.createNCoDyItemsAnulaDoc_compra(idNCoD, data);
            } else if (notas_de_credito_debito_compras.corrige_monto === true) {
                return await this.createNCoDyItemsCorrigeMonto_compras(idNCoD, data);
            } else {
                throw new CustomError(400, "Bad Request", "Se requiere especificar si se anula o corrige el documento");
            }
        } catch (error) {
        throw error;
        }
    }
    async createNCoDyItemsAnulaDoc_compra(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito_compras,
                nota_factura_compra,
                nota_factura_compra_excenta,
                nota_credito_nota_NC_compra
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito_compras) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito_compras es obligatorio");
            }
            if (
                (nota_factura_compra && (nota_factura_compra_excenta || nota_credito_nota_NC_compra)) ||
                (nota_factura_compra_excenta && (nota_factura_compra || nota_credito_nota_NC_compra)) ||
                (nota_credito_nota_NC_compra && (nota_factura_compra || nota_factura_compra_excenta))
            ) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: nota_factura_compra, nota_factura_compra_excenta o nota_credito_nota_NC_compra");
            }
            let operations = [comprasRepository.createNCoD_Compras(idNCoD, notas_de_credito_debito_compras)];
            const items = [
                { item: nota_factura_compra, repository: comprasRepository.createNotaFC, idProperty: "idFacturaCompra" },
                { item: nota_factura_compra_excenta, repository: comprasRepository.createNotaFCE, idProperty: "idFacturaCompraExenta" },
                { item: nota_credito_nota_NC_compra, repository: comprasRepository.createNotaNC, idProperty: "idNotadeCD_anular"}
            ];
            for (const { item, repository, idProperty } of items) {
            if (item) {
                if (idProperty) {
                operations.push(repository(item[idProperty], idNCoD));
                } else {
                operations.push(repository(item, idNCoD));
                }
            }
            }
            const result = await executeTransactions(operations);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC - COMPRAS) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoDyItemsCorrigeMonto_compras(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito_compras,
                item_servicio_nota_credito_compra,
                item_producto_nota_credito_compra,
                item_servicio_nota_credito_NC_compra,
                item_producto_nota_credito_NC_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito_compras) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito_compras es obligatorio");
            }
            if (!item_servicio_nota_credito_compra && !item_producto_nota_credito_compra && !item_servicio_nota_credito_compra && !item_producto_nota_credito_NC_compra && !item_servicio_factura_compra && !item_producto_factura_compra && !item_servicio_factura_compra_excenta && !item_producto_factura_compra_excenta) {
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento");
            }
            let operations = [comprasRepository.createNCoD_Compras(idNCoD, notas_de_credito_debito_compras)];
            // Determinar el conjunto de datos a procesar
            if (item_servicio_nota_credito_compra || item_producto_nota_credito_compra || item_servicio_nota_credito_NC_compra || item_producto_nota_credito_NC_compra) {
                // Primer camino: Nota de crédito/debito
                const itemsNC = [
                    { item: item_servicio_nota_credito_compra, repository: comprasRepository.createItemServicioForNCoD },
                    { item: item_producto_nota_credito_compra, repository: comprasRepository.createItemProductoForNCoD },
                    { item: item_servicio_nota_credito_NC_compra, repository: comprasRepository.createItemServicioForNCoD_NCOD },
                    { item: item_producto_nota_credito_NC_compra, repository: comprasRepository.createItemProductoForNCoD_NCOD },
                ];
                for (const { item, repository } of itemsNC) {
                    if (item && item.length > 0) {
                        const promise = repository(idNCoD, item);
                        operations.push(...promise);
                    }
                }
            } else if (item_servicio_factura_compra || item_producto_factura_compra || item_servicio_factura_compra_excenta || item_producto_factura_compra_excenta) {
                // Segundo camino: Factura venta y excenta
                let idFC;
                let idFCE;
                if(item_servicio_factura_compra || item_producto_factura_compra){
                    idFC = await comprasRepository.getFCidByIdDoc(notas_de_credito_debito_compras.idDoc);
                }
                if(item_servicio_factura_compra_excenta || item_producto_factura_compra_excenta){
                    idFCE = await comprasRepository.getFCEidByIdDoc(notas_de_credito_debito_compras.idDoc)
                }
                const itemsFC_FCE = [
                    { item: item_servicio_factura_compra, repository: comprasRepository.createItemServicioFC, id: idFC },
                    { item: item_producto_factura_compra, repository: comprasRepository.createItemProductoFC, id: idFC },
                    { item: item_servicio_factura_compra_excenta, repository: comprasRepository.createItemServicioFCE, id: idFCE },
                    { item: item_producto_factura_compra_excenta, repository: comprasRepository.createItemProductoFCE, id: idFCE },
                ];
                for (const { item, repository, id } of itemsFC_FCE) {
                    if (item && item.length > 0) {
                        const promise = repository(id, item);
                        operations.push(...promise);
                    }
                }
        } else {
            throw new CustomError(400, "Bad Request", "No se proporcionaron items válidos para procesar");
        }
            const result = await executeTransactions(operations);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE MONTO - COMPRA) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async getFCDetailsbyDC(id){
        return comprasRepository.getFCDetailsbyDC(id)
    }
    async getFCEDetailsbyDC(id){
        return comprasRepository.getFCEDetailsbyDC(id)
    }

    async getAllDataAgosComprasByUserId(id){
        try {
            const FC = await prisma.$queryRaw`SELECT factura_compra.fecha, factura_compra.id AS idFactura,factura_compra.condicion_de_pago,factura_compra.bruto AS Bruto, factura_compra.neto AS Neto, documento_compra.numero_documento, clientes.razon_social AS cliente, documento_compra.id AS idDoc 
            FROM factura_compra 
            JOIN documento_compra ON factura_compra.idDoc = documento_compra.id 
            JOIN clientes ON clientes.id = factura_compra.idCliente
            WHERE documento_compra.user = ${id};`;

            const FCE = await prisma.$queryRaw`SELECT factura_compra_excenta.fecha, factura_compra_excenta.id AS idFactura,factura_compra_excenta.condicion_de_pago,factura_compra_excenta.bruto AS Bruto, factura_compra_excenta.neto AS Neto, documento_compra.numero_documento, clientes.razon_social AS cliente, documento_compra.id AS idDoc 
            FROM factura_compra_excenta 
            JOIN documento_compra ON factura_compra_excenta.idDoc = documento_compra.id 
            JOIN clientes ON clientes.id = factura_compra_excenta.idCliente
            WHERE documento_compra.user = ${id};`;

            const NCOD = await prisma.$queryRaw`SELECT notas_de_credito_debito_compras.fecha, notas_de_credito_debito_compras.tipo_credito, notas_de_credito_debito_compras.tipo_debito, notas_de_credito_debito_compras.id AS idNota, notas_de_credito_debito_compras.bruto AS Bruto,notas_de_credito_debito_compras.neto AS Neto, clientes.razon_social AS cliente, documento_compra.id AS idDoc 
            FROM notas_de_credito_debito_compras 
            JOIN documento_compra ON notas_de_credito_debito_compras.idDoc = documento_compra.id 
            JOIN clientes ON clientes.id = notas_de_credito_debito_compras.idCliente 
            WHERE documento_compra.user = ${id};`
            return ({factura_venta: FV, factura_venta_excenta: FVE, notas: NCOD});
        }catch(error){
            handlePrismaError(error)
        }
    }
    

    async getAllDataComprasByUserId(id) {
        try {
            let documentos = await this.getDCByUser(id);
            const formattedCompras = [];
            for (const documento of documentos) {
                const functionsToTry = [
                    { func: this.getNCoDbyIdDoc, key: 'NotaCredito' },
                    { func: this.getFCDetailsbyDC, key: 'FacturaVenta' },
                    { func: this.getFCEDetailsbyDC, key: 'FacturaVentaExcenta' }
                ];
                const results = [];
                for (const { func, key } of functionsToTry) {
                    try {
                        const resultado = await func(documento.id);
                        if (resultado.length > 0) { // Verificar si el resultado no está vacío
                            results.push({ key, resultado });
                        }
                    } catch (error) {
                        throw error
                    }
                }
                if (results.length > 0) { // Verificar si hay resultados antes de agregarlos
                    const formattedResult = { documento };
                    for (const { key, resultado } of results) {
                        formattedResult[key] = resultado;
                    }
                    formattedCompras.push(formattedResult);
                }
            }
            return formattedCompras;
        } catch (error) {
            throw error;
        }
    }
    async getFCoFCEbyIdDoc(fcDCID, fceDCID) {
        try {
            let detalles;
            let isFCE = false; // Flag para determinar el tipo de factura
            if (fcDCID) {
                detalles = await comprasRepository.getFCDetailsbyDC(fcDCID);
            } else if (fceDCID) {
                detalles = await comprasRepository.getFCEDetailsbyDC(fceDCID);
                isFCE = true; // Cambia el flag si son detalles de factura exenta
            }
            if (detalles.length > 0) {
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                const resultado = {
                    DocumentoCompraID: detalles[0].DocumentoCompraID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDC: detalles[0].NumeroDocumentoDC,
                    FacturaCompra_FacturaCompraExenta: {
                        FacturaID: detalles[0].FacturaCompraID,
                        idDocCompraAsociado: detalles[0].idDocCompraAsociado,
                        ProveedorIDAsociado: detalles[0].ProveedorIDAsociado,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFC_FCE: detalles[0].NumeroDocumento,
                        CondicionPago: detalles[0].CondicionPago,
                        CuentaAsociada: detalles[0].CuentaAsociada,
                        Notas: detalles[0].Notas,
                        Servicios: [],
                        Productos: []
                    }
                };
                detalles.forEach(detalle => {
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicioAsociado: detalle.IdServicioAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Subtotal: detalle.Subtotal,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        uniqueProducts.set(detalle.ItemProductoID, {
                            idProductoAsociado: detalle.idProductoAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                });
                resultado.FacturaCompra_FacturaCompraExenta.Servicios = Array.from(uniqueServices.values());
                resultado.FacturaCompra_FacturaCompraExenta.Productos = Array.from(uniqueProducts.values());
                return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de compra solicitado");
            }
        } catch (error) {
            throw error;
        }
    }
    // Samuelin samuelin te divido la funcion en dos
    async getFCbyIdDoc(fcDCID) {
        try {
            let detalles = await comprasRepository.getFCDetailsbyDC(fcDCID);
            
            if (detalles.length > 0) {
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                const resultado = {
                    DocumentoCompraID: detalles[0].DocumentoCompraID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDC: detalles[0].NumeroDocumentoDC,
                    FacturaCompra_FacturaCompraExenta: {
                        FacturaID: detalles[0].FacturaCompraID,
                        idDocCompraAsociado: detalles[0].idDocCompraAsociado,
                        ProveedorIDAsociado: detalles[0].ProveedorIDAsociado,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFC_FCE: detalles[0].NumeroDocumento,
                        CondicionPago: detalles[0].CondicionPago,
                        CuentaAsociada: detalles[0].CuentaAsociada,
                        Notas: detalles[0].Notas,
                        Servicios: [],
                        Productos: []
                    }
                };
                detalles.forEach(detalle => {
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicioAsociado: detalle.IdServicioAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Subtotal: detalle.Subtotal,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        uniqueProducts.set(detalle.ItemProductoID, {
                            idProductoAsociado: detalle.idProductoAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                });
                resultado.FacturaCompra_FacturaCompraExenta.Servicios = Array.from(uniqueServices.values());
                resultado.FacturaCompra_FacturaCompraExenta.Productos = Array.from(uniqueProducts.values());
                return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de compra solicitado");
            }
        } catch (error) {
            throw error;
        }
    }
    async getFCEbyIdDoc(fceDCID) {
        try {
            let detalles = await comprasRepository.getFCEDetailsbyDC(fceDCID);
            if (detalles.length > 0) {
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                const resultado = {
                    DocumentoCompraID: detalles[0].DocumentoCompraID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDC: detalles[0].NumeroDocumentoDC,
                    FacturaCompra_FacturaCompraExenta: {
                        FacturaID: detalles[0].FacturaCompraID,
                        idDocCompraAsociado: detalles[0].idDocCompraAsociado,
                        ProveedorIDAsociado: detalles[0].ProveedorIDAsociado,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFC_FCE: detalles[0].NumeroDocumento,
                        CondicionPago: detalles[0].CondicionPago,
                        CuentaAsociada: detalles[0].CuentaAsociada,
                        Notas: detalles[0].Notas,
                        Servicios: [],
                        Productos: []
                    }
                };
                detalles.forEach(detalle => {
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicioAsociado: detalle.IdServicioAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Subtotal: detalle.Subtotal,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        uniqueProducts.set(detalle.ItemProductoID, {
                            idProductoAsociado: detalle.idProductoAsociado,
                            idFacturaAsociada: detalle.FacturaCompraAsociada || detalle.FacturaCompraExentaAsociada,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            Cuenta: detalle.Cuenta,
                            NetoServicio: detalle.NetoServicio,
                            Bonificacion: detalle.Bonificacion,
                            Notas: detalle.Notas
                        });
                    }
                });
                resultado.FacturaCompra_FacturaCompraExenta.Servicios = Array.from(uniqueServices.values());
                resultado.FacturaCompra_FacturaCompraExenta.Productos = Array.from(uniqueProducts.values());
                return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de compra solicitado");
            }
        } catch (error) {
            throw error;
        }
    }
    async getNCoDbyIdDoc(DCID){
        try {
            const notas = await comprasRepository.getNCODDetailsbyDC(DCID);
            if (notas.length === 0) {
                throw new CustomError(404, "Not found", `No se encontraron datos para el ID proporcionado: ${DCID}`)
            }
            let resultado = [];
            notas.forEach(nota => {
                // Validación para campos específicos esenciales.
                if (!nota.DocumentoCompraID || !nota.NotadeCreditoODebitoID) {
                    throw new CustomError(400, "Bad Request", 'Falta información crítica en uno de los elementos');
                }
                // Añadiendo dos objetos separados en el resultado
                resultado.push({
                    DocumentoCompra: {
                        DocumentoCompraID: nota.DocumentoCompraID,
                        Usuario: nota.Usuario,
                        NumeroDocumentoDC: nota.NumeroDocumentoDC
                    }
                });
                resultado.push({
                    NotaDeCredito: {
                        NotadeCreditoODebitoID: nota.NotadeCreditoODebitoID,
                        DocumentoCompraAsociado: nota.DocumentoCompraAsociado,
                        ProveedorIDAsociado: nota.ProveedorIDAsociado,
                        VendedorID: nota.VendedorID,
                        TipoCredito: nota.TipoCredito,
                        TipoDebito: nota.TipoDebito,
                        AnulaDoc: nota.AnulaDoc,
                        CorrigeMonto: nota.CorrigeMonto,
                        NumeroDocumentoSII: nota.NumeroDocumentoSII,
                        TipoNota: nota.TipoNota,
                        FechaNCoD: nota.FechaNCoD,
                        MotivoReferencia: nota.MotivoReferencia,
                        CentroBeneficio: nota.CentroBeneficio,
                        Observacion: nota.Observacion,
                        NotaInterna: nota.NotaInterna
                    }
                });
            });
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async  getItemsByNCOD(NCOD, tipoNota) {
        try {
            if (!NCOD) {
                throw new CustomError(400, "Bad Request", 'Tiene que proporcionar un ID de nota-crédito/débito');
            }
            let notas;
            let data;
            let dataFCdetails;
            let dataFCEdetails;
            switch (tipoNota) {
                case 'FC':
                    data = await comprasRepository.notaFC_NCOD(NCOD);
                    const idDC = data[0].DocumentoCompraID
                    const dataFC = await this.getFCoFCEbyIdDoc(idDC, false)
                    dataFCdetails = dataFC.FacturaCompra_FacturaCompraExenta
                    break;
                case 'FCE':
                    console.log('te va a entrar toda')
                    data = await comprasRepository.notaFCE_NCOD(NCOD);
                    console.log(data)
                    const idDCe = data[0].DocumentoCompraID
                    const dataFCE = await this.getFCoFCEbyIdDoc(false, idDCe)
                    dataFCEdetails = dataFCE.FacturaCompra_FacturaCompraExenta
                    break;
                case 'NC':
                    data = await comprasRepository.notaDEncod_NCOD(NCOD);
                    break;
                default:
                    throw new CustomError(400, "Bad Request", 'Tipo de nota no válido');
            }
            if (data.length === 0) {
                throw new CustomError(404, "Not found", 'No se encontraron datos para el ID de nota-crédito/débito proporcionado');
            }
            notas = data.map(item => {
                let notaDeCreditoDebito, DocumentoAsociado, Fdetails;
                switch (tipoNota) {
                    case 'FC':
                        notaDeCreditoDebito = {
                            NotaFacturaCompraID: item.NotaFacturaCompraID,
                            FacturaCompraAsociada: item.FacturaCompraAsociada,
                            NotaDeCreditoAsociadaID: item.NotaDeCreditoAsociadaID
                        };
                        DocumentoAsociado = {
                            FacturaCompraID: item.FacturaCompraID,
                            DocumentoCompraID: item.DocumentoCompraID,
                            ProveedorID: item.ProveedorID,
                            TipoDocumento: item.TipoDocumento,
                            NumeroDocumentoSII: item.NumeroDocumentoSII,
                            FechaFactura: item.FechaFactura,
                            CondicionPago: item.CondicionPago,
                            Cuenta: item.Cuenta,
                            Notas: item.Notas
                        };
                        Fdetails = dataFCdetails
                        break;
                    case 'FCE':
                        notaDeCreditoDebito = {
                            NotaID: item.NotaID,
                            FCEAsociada: item.FCEAsociada,
                            NotaDeCreditoAsociadaID: item.NotaDeCreditoAsociadaID
                        };
                        DocumentoAsociado = {
                            FCEID: item.FCEID,
                            DocumentoCompraID: item.DocumentoCompraID,
                            ProveedorID: item.ProveedorID,
                            TipoDocumento: item.TipoDocumento,
                            NumeroDocumentoSII: item.NumeroDocumentoSII,
                            FechaFactura: item.FechaFactura,
                            VendedorID: item.VendedorID,
                            CondicionPago: item.CondicionPago,
                            CentroBeneficio: item.CentroBeneficio,
                            Observacion: item.Observacion,
                            NotaInterna: item.NotaInterna
                        };
                        Fdetails = dataFCEdetails
                        break;
                    case 'NC':
                        notaDeCreditoDebito = {
                            NotaID: item.NotaID,
                            NCAsociada: item.NCAsociada,
                            NotaDeCreditoAsociadaID: item.NotaDeCreditoAsociadaID
                        };
                        DocumentoAsociado = {
                            NCoDID: item.NCoDID,
                            DocumentoCompraID: item.DocumentoCompraID,
                            ProveedorID: item.ProveedorID,
                            vendedorID: item.vendedorID,
                            TipoCredito: item.TipoCredito,
                            TipoDebito: item.TipoDebito,
                            AnulaDoc: item.AnulaDoc,
                            CorrigeMonto: item.CorrigeMonto,
                            NumeroDocumentoSII: item.NumeroDocumentoSII,
                            TipoNota: item.TipoNota,
                            FechaFactura: item.FechaFactura,
                            MotivoReferencia: item.MotivoReferencia,
                            CentroBeneficio: item.CentroBeneficio,
                            Observacion: item.Observacion,
                            NotaInterna: item.NotaInterna
                        };
                        break;
                }
                return { notaDeCreditoDebito, DocumentoAsociado, Fdetails };
            });
            return notas;
        } catch (error) {
            throw error;
        }
    }
}
export default new ComprasService()