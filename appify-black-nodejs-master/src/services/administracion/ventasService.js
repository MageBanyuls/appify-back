import ventasRepository from "../../persistence/repositorys/administracion/ventasRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { prisma } from "../../utils/dependencys/injection.js";
import handlePrismaError from "../../utils/httpRes/handlePrismaError.js";
import DTEService from "../dte/DTEService.js";
class VentasService {
    async getAllFV(){
        try {
            const facturas = await ventasRepository.getAllFV()
            if(!facturas || facturas.length === 0){
                throw new CustomError(404, "Not Found", "No se encontraron facturas de venta");
            }
            // Obtener el conteo de facturas
            const conteoFacturas = facturas.length;
            // Iterar sobre cada factura
            const formattedResult = facturas.map(async factura => {
                // Obtener el nombre del cliente y del vendedor
                const cliente = await clientesRepository.findClienteById_razonsocial(factura.ClienteID)
                const vendedor = await userRepository.findUserByID_nombre_apellido(factura.VendedorID);
                // Devolver los datos formateados
                return {
                    ...factura,
                    cliente: cliente ? cliente : 'Cliente no encontrado',
                    vendedor: vendedor ? `${vendedor.nombre} ${vendedor.apellido}` : 'Vendedor no encontrado',
                };
        });
        // Esperar a que se resuelvan todas las promesas
        const finalResult = await Promise.all(formattedResult);
        return finalResult;
        } catch (error) {
            throw error
        }
    }
    async getNCoDbyIdDoc(DVID){
        try {
            const notas = await ventasRepository.getNCoDbyIdDoc(DVID)
            return notas;
        } catch (error) {
            throw error
        }
    }
    async getAllDocVenta(){
        try {
            return await ventasRepository.getAllDV();
        } catch (error) {
            throw error
        }
    }
    async getAllDocDespacho(){
        try {
            return await ventasRepository.getAllDD();
        } catch (error) {
            throw error
        }
    }
    async getDVByUser(user){
        try {
            if (!user) {
                throw new CustomError(400, "Bad Request", "El usuario no puede estar vacío");
            }
            return await ventasRepository.getDVByUser(user);
        } catch (error) {
            throw error
        }
    }
    async getDDByUser(user){
        try {
            if (!user) {
                throw new CustomError(400, "Bad Request", "El usuario no puede estar vacío");
            }
            return await ventasRepository.getDDByUser(user);
        } catch (error) {
            throw error
        }
    }
    async getItemsByNCOD(NCOD, tipoNota){
        try {
            if(!NCOD){
                throw new CustomError(400, "Bad Request", 'Tiene que proporcionar un ID de nota-credito/debito');
            }
            let notas;
            switch (tipoNota) {
                case 'FV':
                    notas = await ventasRepository.notaFV_NCOD(NCOD);
                    break;
                case 'FVE':
                    notas = await ventasRepository.notaFVE_NCOD(NCOD);
                    break;
                case 'NC':
                    notas = await ventasRepository.notaDEncod_NCOD(NCOD);
                    break;
                default:
                    throw new CustomError(400, "Bad Request", 'Tipo de nota no válido');
            }
            return notas;
        } catch (error) {
            throw error
        }
    }
    async buscarFacturaAsociada(idReferencia) {
        try {
            const idDocumento = await ventasRepository.getDocAsociadoByIdNCOD(idReferencia);
            if (!idDocumento) {
                throw new CustomError(404, "Not Found", "No existe un documento asociado con este NCOD");
            }
            const prefix = idDocumento.split('-')[0];
            switch (prefix) {
                case 'NC':
                    return await this.buscarFacturaAsociada(idDocumento); // Recursividad aquí
                case 'FV':
                    const fvItems = await ventasRepository.getItemsByFVId(idDocumento);
                    return { tipo: 'FV', items: fvItems };
                case 'FVE':
                    const fveItems = await ventasRepository.getItemsByFVEId(idDocumento);
                    return { tipo: 'FVE', items: fveItems };
                default:
                    throw new CustomError(400, "Bad Request", "Tipo de documento desconocido: " + prefix);
            }
        } catch (error) {
            throw err
        }
    }
    async getFVoFVEbyDC(idDocumentoVenta){
        try {
            if (!idDocumentoVenta) {
                throw new CustomError(400, "Bad Request", "falta el id de su documento de venta");
            }
            const fv_fve = await ventasRepository.getFVoFVEbyDC(idDocumentoVenta);
            const facturas = [];
            let tipoFactura;
            // Añadiendo una verificación para determinar el tipo de factura
            fv_fve.forEach(factura => {
                if (factura.id.startsWith('FVE-')) {
                    tipoFactura = "FVE";
                } else if (factura.id.startsWith('FV-')) {
                    tipoFactura = "FV";
                } else {
                    tipoFactura = "Desconocido";
                }
                // Creando un objeto para cada factura y agregándolo al array
                facturas.push({
                    id: factura.id,
                    tipo: tipoFactura
                });
            });
            
            return facturas;
        } catch (error) {
            throw error
        }
    }
    async getFVDetailsbyDV(id) {
        return ventasRepository.getFVDetailsbyDV(id)
    }
    async getFVEDetailsbyDV(id) {
        return ventasRepository.getFVEDetailsbyDV(id)
    }
    async getAllDataVentasByUserId(id) {
        try {
            let documentos = await this.getDVByUser(id);
            const formattedVentas = [];
            for (const documento of documentos) {
                const functionsToTry = [
                    { func: this.getNCoDbyIdDoc, key: 'NotaCredito' },
                    { func: this.getFVDetailsbyDV, key: 'FacturaVenta' },
                    { func: this.getFVEDetailsbyDV, key: 'FacturaVentaExcenta' }
                ];
                const results = [];
                for (const { func, key } of functionsToTry) {
                    const resultado = await func(documento.id);
                    if (resultado.length > 0) { // Verificar si el resultado no está vacío
                        results.push({ key, resultado });
                    }
                }
                if (results.length > 0) { // Verificar si hay resultados antes de agregarlos
                    const formattedResult = { documento };
                    for (const { key, resultado } of results) {
                        formattedResult[key] = resultado;
                        if (key === 'FacturaVenta') {
                            // Agregar TipoDocumento a documento
                            formattedResult.documento.TipoDocumento = resultado[0].TipoDocumento;
                        }else if (key === 'FacturaVentaExcenta') {
                            // Agregar TipoDocumentoExcento a documento
                            formattedResult.documento.TipoDocumento = resultado[0].TipoDocumento;
                        }else if (key === 'NotaCredito' && resultado[0].tipo_debito === true) {
                            // Agregar TipoDocumentoExcento a documento
                            formattedResult.documento.TipoDocumento = resultado[0].tipo_debito;
                        }else if (key === 'NotaCredito' && resultado[0].tipo_credito === true) {
                            // Agregar TipoDocumentoExcento a documento
                            formattedResult.documento.TipoDocumento = resultado[0].tipo_credito;
                        }
                    }
                    formattedVentas.push(formattedResult);
                }
            }
            return formattedVentas;
        } catch (error) {
            throw error;
        }
    }

    async getAllDataAgosVentasByUserId(id) {
        try {
            const FV = await prisma.$queryRaw`SELECT factura_venta.idCliente,factura_venta.ot,factura_venta.fecha, factura_venta.id AS idFactura,factura_venta.condicion_de_pago,factura_venta.bruto AS Bruto, factura_venta.neto AS Neto, documento_venta.numero_documento, clientes.razon_social AS cliente, documento_venta.id AS idDoc 
            FROM factura_venta 
            JOIN documento_venta ON factura_venta.idDoc = documento_venta.id 
            JOIN clientes ON clientes.id = factura_venta.idCliente
            WHERE documento_venta.user = ${id};`;
     
            const FVE = await prisma.$queryRaw`SELECT factura_venta_excenta.idCliente,factura_venta_excenta.ot,factura_venta_excenta.fecha, factura_venta_excenta.id AS idFactura,factura_venta_excenta.condicion_de_pago,factura_venta_excenta.bruto AS Bruto, factura_venta_excenta.neto AS Neto, documento_venta.numero_documento, clientes.razon_social AS cliente, documento_venta.id AS idDoc 
            FROM factura_venta_excenta 
            JOIN documento_venta ON factura_venta_excenta.idDoc = documento_venta.id 
            JOIN clientes ON clientes.id = factura_venta_excenta.idCliente
            WHERE documento_venta.user = ${id};`;
     
     
            const NCOD = await prisma.$queryRaw`SELECT notas_de_credito_debito.idCliente,notas_de_credito_debito.fecha, notas_de_credito_debito.tipo_credito, notas_de_credito_debito.tipo_debito, notas_de_credito_debito.id AS idNota, notas_de_credito_debito.bruto AS Bruto,notas_de_credito_debito.neto AS Neto, clientes.razon_social AS cliente, documento_venta.id AS idDoc 
            FROM notas_de_credito_debito 
            JOIN documento_venta ON notas_de_credito_debito.idDoc = documento_venta.id 
            JOIN clientes ON clientes.id = notas_de_credito_debito.idCliente 
            WHERE documento_venta.user = ${id};`
     
            let FV_data = [];
     
            for (const item of FV) {
     
                let objData;
                const idFactura = item.idFactura;
                const ot = item.ot
                if(ot === 1){
                    //si tiene 
                    const proyectos = await prisma.$queryRaw`
                        SELECT proyectos.id AS idProyecto,orden_trabajo.id AS idOT  
                        FROM proyectos 
                        JOIN orden_trabajo ON proyectos.id = orden_trabajo.idProyecto 
                        JOIN orden_trabajo_FV ON orden_trabajo_FV.idOrdenT = orden_trabajo.id 
                        WHERE orden_trabajo_FV.idFacturaVenta = ${idFactura}
                    `;
     
                    let productos = [];
                    let servicios = [];
     
                    for (const proyecto of proyectos){
     
                        const idProyecto = proyecto.idProyecto
     
                        const productos_items = await prisma.$queryRaw`
                            SELECT productos.id,productos.nombre, item_producto_proyecto.cantidad, item_producto_proyecto.total, item_producto_proyecto.precio, item_producto_proyecto.impuesto, item_producto_proyecto.porcentaje_descuento, 
                            ${proyecto.idOT} as idOT 
                            FROM item_producto_proyecto JOIN productos ON item_producto_proyecto.idProducto = productos.id WHERE item_producto_proyecto.idProyecto = ${idProyecto}
                        `
                        const servicios_items = await prisma.$queryRaw`
                            SELECT servicios.id,servicios.nombre, item_servicio_proyecto.cantidad, item_servicio_proyecto.total, item_servicio_proyecto.precio, item_servicio_proyecto.impuesto, item_servicio_proyecto.porcentaje_descuento, 
                            ${proyecto.idOT} as idOT  
                            FROM item_servicio_proyecto JOIN servicios ON item_servicio_proyecto.idServicio = servicios.id WHERE item_servicio_proyecto.idProyecto = ${idProyecto}
                        `
     
                        productos = [...productos,...productos_items]
                        servicios = [...servicios,...servicios_items]
                    }
     
                    objData = {
                        ...item, 
                        productos_servicios:{
                            productos,
                            servicios
                        }
                    }
     
                }else{
                    //no tiene
                    const productos = await prisma.$queryRaw`
                        SELECT productos.id,item_producto_factura_venta.codigo, item_producto_factura_venta.cantidad, item_producto_factura_venta.unitario,  item_producto_factura_venta.neto, item_producto_factura_venta.notas, productos.nombre FROM item_producto_factura_venta JOIN productos ON item_producto_factura_venta.idProducto = productos.id WHERE idFactura = ${idFactura};
                    `;
                    const servicios = await prisma.$queryRaw`
                        SELECT servicios.id,item_servicio_factura_venta.codigo, item_servicio_factura_venta.cantidad, item_servicio_factura_venta.unitario,  item_servicio_factura_venta.neto, item_servicio_factura_venta.notas, servicios.nombre FROM item_servicio_factura_venta JOIN servicios ON item_servicio_factura_venta.idServicio = servicios.id WHERE idFactura =  ${idFactura};
                    `;
                    objData = {
                        ...item, 
                        productos_servicios:{
                            productos,
                            servicios
                        }
                    }
                }
     
                FV_data.push(objData)
            }
     
            let FVE_data = [];
     
            for (const item of FVE) {
                let objData;
                const idFactura = item.idFactura;
                const ot = item.ot
                if( ot === 1 ){
                    //si tiene 
                    const proyectos = await prisma.$queryRaw`
                        SELECT proyectos.id AS idProyecto,orden_trabajo.id AS idOT  
                        FROM proyectos 
                        JOIN orden_trabajo ON proyectos.id = orden_trabajo.idProyecto 
                        JOIN orden_trabajo_FVE ON orden_trabajo_FVE.idOrdenT = orden_trabajo.id 
                        WHERE orden_trabajo_FVE.idFacturaVentaExcenta = ${idFactura}
                    `;
     
                    let productos = [];
                    let servicios = [];
     
                    for (const proyecto of proyectos){
     
                        const idProyecto = proyecto.idProyecto
     
                        const productos_items = await prisma.$queryRaw`
                            SELECT productos.id,productos.nombre, item_producto_proyecto.cantidad, item_producto_proyecto.total, item_producto_proyecto.precio, item_producto_proyecto.impuesto, item_producto_proyecto.porcentaje_descuento, 
                            ${proyecto.idOT} as idOT 
                            FROM item_producto_proyecto JOIN productos ON item_producto_proyecto.idProducto = productos.id WHERE item_producto_proyecto.idProyecto = ${idProyecto}
                        `
                        const servicios_items = await prisma.$queryRaw`
                            SELECT servicios.id,servicios.nombre, item_servicio_proyecto.cantidad, item_servicio_proyecto.total, item_servicio_proyecto.precio, item_servicio_proyecto.impuesto, item_servicio_proyecto.porcentaje_descuento, 
                            ${proyecto.idOT} as idOT  
                            FROM item_servicio_proyecto JOIN servicios ON item_servicio_proyecto.idServicio = servicios.id WHERE item_servicio_proyecto.idProyecto = ${idProyecto}
                        `
     
                        productos = [...productos,...productos_items]
                        servicios = [...servicios,...servicios_items]
                    }
     
                    objData = {
                        ...item, 
                        productos_servicios:{
                            productos,
                            servicios
                        }
                    }
                }else{
                    const productos = await prisma.$queryRaw`
                        SELECT productos.id,item_producto_factura_venta_excenta.codigo, item_producto_factura_venta_excenta.cantidad, item_producto_factura_venta_excenta.unitario,  item_producto_factura_venta_excenta.neto, item_producto_factura_venta_excenta.notas, productos.nombre FROM item_producto_factura_venta_excenta JOIN productos ON item_producto_factura_venta_excenta.idProducto = productos.id WHERE idFactura = ${idFactura};
                    `;
                    const servicios = await prisma.$queryRaw`
                        SELECT servicios.id,item_servicio_factura_venta_excenta.codigo, item_servicio_factura_venta_excenta.cantidad, item_servicio_factura_venta_excenta.unitario, item_servicio_factura_venta_excenta.unitario, item_servicio_factura_venta_excenta.neto, item_servicio_factura_venta_excenta.notas, servicios.nombre FROM item_servicio_factura_venta_excenta JOIN servicios ON item_servicio_factura_venta_excenta.idServicio = servicios.id WHERE idFactura = ${idFactura};
                    `;
     
                    objData = {
                        ...item, 
                        productos_servicios:{
                            productos,
                            servicios
                        }
                    }
                }
                // Puedes hacer algo con additionalData aquí
                FVE_data.push(objData)
            }
     
            return ({factura_venta: FV_data, factura_venta_excenta: FVE_data, notas: NCOD});
        }catch(error){
            handlePrismaError(error)
        }
    }

    async getAllDataAgosItemsVentasByUserId (id){
        try{
            const datitos = await this.getAllDataAgosVentasByUserId(id);

            const {
                factura_venta,
                factura_venta_excenta,
                notas
            } = datitos;

            for (const fv in factura_venta) {

            }

        }catch(err) {
            handlePrismaError(err)
        }
    }
    async getFVoFVEbyIdDoc(fvDVID, fveDVID) {
        try {
            let detalles;
            if (fvDVID){
                detalles = await ventasRepository.getFVDetailsbyDV(fvDVID)
            } else if (fveDVID){
                detalles = await ventasRepository.getFVEDetailsbyDV(fveDVID)
            }
            // Reestructurando los datos para agruparlos en un solo objeto
            // Verifica si la consulta devolvió algún detalle
            if (detalles.length > 0) {
                // mapas para mantener servicios y productos únicos
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                // Prepara el objeto resultado con la información básica de la factura y documento de venta
                const resultado = {
                    DocumentoVentaID: detalles[0].DocumentoVentaID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDV: detalles[0].NumeroDocumentoDV,
                    FacturaVenta_FacturaVentaExenta: {
                        FacturaID: detalles[0].FacturaVentaID,
                        ClienteID: detalles[0].ClienteID,
                        VendedorID: detalles[0].VendedorID,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFV_FVE: detalles[0].NumeroDocumentoFV,
                        CondicionPago: detalles[0].CondicionPago,
                        CentroBeneficio: detalles[0].CentroBeneficio,
                        Observacion: detalles[0].Observacion,
                        NotaInterna: detalles[0].NotaInterna,
                        Servicios: [], // Inicializa un array vacío para servicios
                        Productos: [] // Inicializa un array vacío para productos
                    }
                };
                // Itera sobre cada detalle retornado de la consulta
                detalles.forEach(detalle => {
                    // Verifica si el item de servicio es único y no ha sido añadido aún
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        // Agrega el servicio al mapa si es único
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicio: detalle.idServicio,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            BrutoServicio: detalle.BrutoServicio,
                            NetoServicio: detalle.NetoServicio,
                            BonificacionServicio: detalle.BonificacionServicio,
                            NotasServicio: detalle.NotasServicio
                        });
                    }
                    // Verifica si el item de producto es único y no ha sido añadido aún
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        // Agrega el producto al mapa si es único
                        uniqueProducts.set(detalle.ItemProductoID, {
                            IdProducto: detalle.idProducto,
                            CodigoProducto: detalle.CodigoProducto,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            BrutoProducto: detalle.BrutoProducto,
                            NetoProducto: detalle.NetoProducto,
                            BonificacionProducto: detalle.BonificacionProducto,
                            NotasProducto: detalle.NotasProducto
                        });
                    }
                });
            // Convierte los mapas de servicios y productos en arrays y los asigna al resultado
            resultado.FacturaVenta_FacturaVentaExenta.Servicios = Array.from(uniqueServices.values());
            resultado.FacturaVenta_FacturaVentaExenta.Productos = Array.from(uniqueProducts.values());
            return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de venta solicitado")
            }
        } catch (error) {
            throw error
        }
    }
    // SAMUELIN SAMUELIN VOY A DIVIDIRLA EN DOS A LA DE ARRIBA DE ESTO
    async getFVIdDoc(fvDVID) {
        try {
            let detalles = await ventasRepository.getFVDetailsbyDV(fvDVID)
            // Reestructurando los datos para agruparlos en un solo objeto
            // Verifica si la consulta devolvió algún detalle
            if (detalles.length > 0) {
                // mapas para mantener servicios y productos únicos
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                // Prepara el objeto resultado con la información básica de la factura y documento de venta
                const resultado = {
                    DocumentoVentaID: detalles[0].DocumentoVentaID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDV: detalles[0].NumeroDocumentoDV,
                    FacturaVenta_FacturaVentaExenta: {
                        FacturaID: detalles[0].FacturaVentaID,
                        ClienteID: detalles[0].ClienteID,
                        VendedorID: detalles[0].VendedorID,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFV_FVE: detalles[0].NumeroDocumentoFV,
                        CondicionPago: detalles[0].CondicionPago,
                        CentroBeneficio: detalles[0].CentroBeneficio,
                        Observacion: detalles[0].Observacion,
                        NotaInterna: detalles[0].NotaInterna,
                        Servicios: [], // Inicializa un array vacío para servicios
                        Productos: [] // Inicializa un array vacío para productos
                    }
                };
                // Itera sobre cada detalle retornado de la consulta
                detalles.forEach(detalle => {
                    // Verifica si el item de servicio es único y no ha sido añadido aún
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        // Agrega el servicio al mapa si es único
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicio: detalle.idServicio,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            BrutoServicio: detalle.BrutoServicio,
                            NetoServicio: detalle.NetoServicio,
                            BonificacionServicio: detalle.BonificacionServicio,
                            NotasServicio: detalle.NotasServicio
                        });
                    }
                    // Verifica si el item de producto es único y no ha sido añadido aún
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        // Agrega el producto al mapa si es único
                        uniqueProducts.set(detalle.ItemProductoID, {
                            IdProducto: detalle.idProducto,
                            CodigoProducto: detalle.CodigoProducto,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            BrutoProducto: detalle.BrutoProducto,
                            NetoProducto: detalle.NetoProducto,
                            BonificacionProducto: detalle.BonificacionProducto,
                            NotasProducto: detalle.NotasProducto
                        });
                    }
                });
            // Convierte los mapas de servicios y productos en arrays y los asigna al resultado
            resultado.FacturaVenta_FacturaVentaExenta.Servicios = Array.from(uniqueServices.values());
            resultado.FacturaVenta_FacturaVentaExenta.Productos = Array.from(uniqueProducts.values());
            return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de venta solicitado")
            }
        } catch (error) {
            throw error
        }
    }
    async getFVEIdDoc(fveDVID) {
        try {
            let detalles = await ventasRepository.getFVEDetailsbyDV(fveDVID)
            // Reestructurando los datos para agruparlos en un solo objeto
            // Verifica si la consulta devolvió algún detalle
            if (detalles.length > 0) {
                // mapas para mantener servicios y productos únicos
                const uniqueServices = new Map();
                const uniqueProducts = new Map();
                // Prepara el objeto resultado con la información básica de la factura y documento de venta
                const resultado = {
                    DocumentoVentaID: detalles[0].DocumentoVentaID,
                    Usuario: detalles[0].Usuario,
                    NumeroDocumentoDV: detalles[0].NumeroDocumentoDV,
                    FacturaVenta_FacturaVentaExenta: {
                        FacturaID: detalles[0].FacturaVentaID,
                        ClienteID: detalles[0].ClienteID,
                        VendedorID: detalles[0].VendedorID,
                        FechaFactura: detalles[0].FechaFactura,
                        TipoDocumento: detalles[0].TipoDocumento,
                        NumeroDocumentoFV_FVE: detalles[0].NumeroDocumentoFV,
                        CondicionPago: detalles[0].CondicionPago,
                        CentroBeneficio: detalles[0].CentroBeneficio,
                        Observacion: detalles[0].Observacion,
                        NotaInterna: detalles[0].NotaInterna,
                        Servicios: [], // Inicializa un array vacío para servicios
                        Productos: [] // Inicializa un array vacío para productos
                    }
                };
                // Itera sobre cada detalle retornado de la consulta
                detalles.forEach(detalle => {
                    // Verifica si el item de servicio es único y no ha sido añadido aún
                    if (detalle.ItemServicioID && !uniqueServices.has(detalle.ItemServicioID)) {
                        // Agrega el servicio al mapa si es único
                        uniqueServices.set(detalle.ItemServicioID, {
                            IdServicio: detalle.idServicio,
                            CodigoServicio: detalle.CodigoServicio,
                            CantidadServicio: detalle.CantidadServicio,
                            PrecioUnitarioServicio: detalle.PrecioUnitarioServicio,
                            BrutoServicio: detalle.BrutoServicio,
                            NetoServicio: detalle.NetoServicio,
                            BonificacionServicio: detalle.BonificacionServicio,
                            NotasServicio: detalle.NotasServicio
                        });
                    }
                    // Verifica si el item de producto es único y no ha sido añadido aún
                    if (detalle.ItemProductoID && !uniqueProducts.has(detalle.ItemProductoID)) {
                        // Agrega el producto al mapa si es único
                        uniqueProducts.set(detalle.ItemProductoID, {
                            IdProducto: detalle.idProducto,
                            CodigoProducto: detalle.CodigoProducto,
                            CantidadProducto: detalle.CantidadProducto,
                            PrecioUnitarioProducto: detalle.PrecioUnitarioProducto,
                            BrutoProducto: detalle.BrutoProducto,
                            NetoProducto: detalle.NetoProducto,
                            BonificacionProducto: detalle.BonificacionProducto,
                            NotasProducto: detalle.NotasProducto
                        });
                    }
                });
            // Convierte los mapas de servicios y productos en arrays y los asigna al resultado
            resultado.FacturaVenta_FacturaVentaExenta.Servicios = Array.from(uniqueServices.values());
            resultado.FacturaVenta_FacturaVentaExenta.Productos = Array.from(uniqueProducts.values());
            return resultado;
            } else {
                throw new CustomError(404, "Not Found", "No se encontraron detalles para el documento de venta solicitado")
            }
        } catch (error) {
            throw error
        }
    }
    async createFV(data) {
        try {
            const {
                documento_venta,
                factura_venta,
                item_servicio_factura_venta,
                item_producto_factura_venta,
                orden_trabajo_FV,
                emisor
            } = data;
            let folio;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_venta && !item_producto_factura_venta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de venta")
            }
            if(!emisor){
                throw new CustomError(400, "Bad Request", "Para realizar la op FV se debe indicar campo emisor")
            }
            // const dteCreated = await DTEService.createFV(data)
            // folio = dteCreated.folio
            folio = 0
            const idFV = idgenerate("FV")
            const idDV = idgenerate("DV")
            let operations = []
            operations.push(ventasRepository.createDocVentas(idDV, folio, documento_venta));
            operations.push(ventasRepository.createFV(idFV, idDV, folio, factura_venta ));
            if(factura_venta.ot === true && orden_trabajo_FV.length > 0){
                const itemsOT = ventasRepository.createOTinFV(idFV, orden_trabajo_FV)
                operations.push(...itemsOT)
            }
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_venta && item_servicio_factura_venta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = ventasRepository.createItemServicioFV(idFV, item_servicio_factura_venta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_venta && item_producto_factura_venta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = ventasRepository.createItemProductoFV(idFV, item_producto_factura_venta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FV completas con éxito", result /*,DTE: dteCreated*/ };
        } catch (error) {
            throw error;
        }
    }
    async createDD(data) {
        try {
            const { documento_despacho } = data;
            if (!documento_despacho) {
                throw new CustomError(400, "Bad Request", "El documento de despacho es obligatorio.");
            }
            // Validar que solo uno de los campos venta o traslado sea true
            if ((documento_despacho.venta && documento_despacho.traslado) || (!documento_despacho.venta && !documento_despacho.traslado)) {
                throw new CustomError(400, "Bad Request", "Debe especificar solo uno de los campos 'venta' o 'traslado' como true en el documento de despacho.");
            }
            const idDD = idgenerate("DD");
            const operations = [];
            operations.push(ventasRepository.createDD(idDD, documento_despacho));
            if (documento_despacho.venta === true) {
                await this.createDocumentoVenta(data, idDD, operations);
            } else if (documento_despacho.traslado === true) {
                await this.createDocumentoTraslado(data, idDD, operations);
            }
            const result = await executeTransactions(operations);
            return { message: "Transacciones completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createDocumentoVenta(data, idDD, operations) {
        try {
            const {
                documento_despacho_venta,
                item_despacho_venta_ot,
                item_producto_documento_despacho_venta
            } = data;
            if (!documento_despacho_venta) {
                throw new CustomError(400, "Bad Request", "Los detalles de la venta son obligatorios.");
            }
             // Validar que solo uno de los campos ot o fact_libre sea true
            if ((documento_despacho_venta.ot && documento_despacho_venta.fact_libre) || (!documento_despacho_venta.ot && !documento_despacho_venta.fact_libre)) {
                throw new CustomError(400, "Bad Request", "Debe especificar solo uno de los campos 'ot' o 'fact_libre' como true en los detalles de la venta.");
            }
            const idDDV = idgenerate("DDV");
            operations.push(ventasRepository.createDocDespachoVenta(idDDV, idDD, documento_despacho_venta));
            if (documento_despacho_venta.ot === true) {
                if (!item_despacho_venta_ot || item_despacho_venta_ot <= 0) {
                    throw new CustomError(400, "Bad Request", "Los items de despacho de venta OT son necesarios y deben ser mayores a 0.");
                }
                const promiseDVot = ventasRepository.createItemDespachoVentaOt(idDDV, item_despacho_venta_ot);
                operations.push(...promiseDVot);
            } else if (documento_despacho_venta.fact_libre === true) {
                if (!item_producto_documento_despacho_venta || item_producto_documento_despacho_venta <= 0) {
                    throw new CustomError(400, "Bad Request", "Los productos del documento de despacho de venta son necesarios y deben ser mayores a 0.");
                }
                const promiseDDVProd = ventasRepository.createItemProductoDDV(idDDV, item_producto_documento_despacho_venta);
                operations.push(...promiseDDVProd);
            }
        } catch (error) {
            throw error
        }
    }
    async createDocumentoTraslado(data, idDD, operations) {
        try {
            const {
                documento_despacho_traslado,
                item_despacho_traslado_ot,
                item_producto_documento_despacho_traslado
            } = data;
            if (!documento_despacho_traslado) {
                throw new CustomError(400, "Bad Request", "Los detalles de traslado son obligatorios.");
            }
            // Validar que solo uno de los campos ot o fact_libre sea true
            if ((documento_despacho_traslado.ot && documento_despacho_traslado.fact_libre) || (!documento_despacho_traslado.ot && !documento_despacho_traslado.fact_libre)) {
                throw new CustomError(400, "Bad Request", "Debe especificar solo uno de los campos 'ot' o 'fact_libre' como true en los detalles de traslado.");
            }
            const idDDT = idgenerate("DDT");
            operations.push(ventasRepository.createDDT(idDDT, idDD, documento_despacho_traslado));
            if (documento_despacho_traslado.ot === true) {
                if (!item_despacho_traslado_ot || item_despacho_traslado_ot <= 0) {
                    throw new CustomError(400, "Bad Request", "Los items de despacho de traslado OT son necesarios y deben ser mayores a 0.");
                }
                const promiseDDTot = ventasRepository.createItemDespachoTrasladoOt(idDDT, item_despacho_traslado_ot);
                operations.push(...promiseDDTot);
            } else if (documento_despacho_traslado.fact_libre === true) {
                if (!item_producto_documento_despacho_traslado || item_producto_documento_despacho_traslado <= 0) {
                    throw new CustomError(400, "Bad Request", "Los productos del documento de despacho de traslado son necesarios y deben ser mayores a 0.");
                }
                const promiseItemProdDDT = ventasRepository.createItemProductoDDT(idDDT, item_producto_documento_despacho_traslado);
                operations.push(...promiseItemProdDDT);
            }
        } catch (error) {
            throw error
        }
    }
    async createFVE(data) {
        try {
            const {
                emisor,
                documento_venta,
                factura_venta_excenta,
                item_servicio_factura_venta_excenta,
                item_producto_factura_venta_excenta,
                orden_trabajo_FVE
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_venta_excenta && !item_producto_factura_venta_excenta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de venta exenta")
            }
            const idFVE = idgenerate("FVE")
            const idDV = idgenerate("DV")
            let operations = []
            let folio;
            folio = 0;
            operations.push(ventasRepository.createDocVentas(idDV,folio, documento_venta));
            operations.push(ventasRepository.createFVE(idFVE, idDV, factura_venta_excenta));
            if (factura_venta_excenta.ot === true && orden_trabajo_FVE.length > 0) {
                const itemsOT = ventasRepository.createOTinFVE(idFVE, orden_trabajo_FVE)
                operations.push(...itemsOT)
            }
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_venta_excenta && item_servicio_factura_venta_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = ventasRepository.createItemServicioFVE(idFVE, item_servicio_factura_venta_excenta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_venta_excenta && item_producto_factura_venta_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = ventasRepository.createItemProductoFVE(idFVE, item_producto_factura_venta_excenta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FVE completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    
    async createNCoDyItems(data) {
        try {
            const {
                emisor,
                notas_de_credito_debito,
                nota_factura_venta,
                nota_factura_venta_excenta,
                nota_credito_nota_NC,
                item_servicio_nota_credito,
                item_producto_nota_credito,
                item_servicio_nota_credito_NC,
                item_producto_nota_credito_NC,
                item_servicio_factura_venta,
                item_producto_factura_venta,
                item_servicio_factura_venta_excenta,
                item_producto_factura_venta_excenta
            } = data;
            let idNCoD;
            if(notas_de_credito_debito.tipo_debito === true){
                idNCoD = idgenerate("ND")
            } else {
                idNCoD = idgenerate("NC")
            }
            if (notas_de_credito_debito.anula_doc === true && notas_de_credito_debito.corrige_monto === true) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: anular o corregir el documento");} 
            else if (notas_de_credito_debito.anula_doc === true) {
                return await this.createNCoDyItemsAnulaDoc(idNCoD, data);
            } else if (notas_de_credito_debito.corrige_monto === true) {
                return await this.createNCoDyItemsCorrigeMonto(idNCoD, data);
            } else {
                throw new CustomError(400, "Bad Request", "Se requiere especificar si se anula o corrige el documento");
            }
        } catch (error) {
        throw error;
        }
    }
    async createNCoDyItemsAnulaDoc(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito,
                nota_factura_venta,
                nota_factura_venta_excenta,
                nota_credito_nota_NC
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito es obligatorio");
            }
            if (
                (nota_factura_venta && (nota_factura_venta_excenta || nota_credito_nota_NC)) ||
                (nota_factura_venta_excenta && (nota_factura_venta || nota_credito_nota_NC)) ||
                (nota_credito_nota_NC && (nota_factura_venta || nota_factura_venta_excenta))
            ) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: nota_factura_venta, nota_factura_venta_excenta o nota_credito_nota_NC");
            }
            
            let operations = [ventasRepository.createNCoD(idNCoD, notas_de_credito_debito)];
            const items = [
                { item: nota_factura_venta, repository: ventasRepository.createNotaFV, idProperty: "idFacturaVenta" },
                { item: nota_factura_venta_excenta, repository: ventasRepository.createNotaFVE, idProperty: "idFacturaVentaExcenta" },
                { item: nota_credito_nota_NC, repository: ventasRepository.createNotaNC}
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
            //Creacion del documento temporal y real con la data entrante
            const resultDTE = await DTEService.createNCOD(data);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC) completas con éxito", result ,DTE: resultDTE };
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async createNCoDyItemsCorrigeMonto(idNCoD, data) {
        try {
            const {
                emisor,
                notas_de_credito_debito,
                item_servicio_nota_credito,
                item_producto_nota_credito,
                item_servicio_nota_credito_NC,
                item_producto_nota_credito_NC,
                item_servicio_factura_venta,
                item_producto_factura_venta,
                item_servicio_factura_venta_excenta,
                item_producto_factura_venta_excenta
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito es obligatorio");
            }
            if (!item_servicio_nota_credito && !item_producto_nota_credito && !item_servicio_nota_credito_NC && !item_producto_nota_credito_NC && !item_servicio_factura_venta && !item_producto_factura_venta && !item_servicio_factura_venta_excenta && !item_producto_factura_venta_excenta) {
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento");
            }
            
            let operations = [ventasRepository.createNCoD(idNCoD, notas_de_credito_debito)];
            // Determinar el conjunto de datos a procesar
            if (item_servicio_nota_credito || item_producto_nota_credito || item_servicio_nota_credito_NC || item_producto_nota_credito_NC) {
                // Primer camino: Nota de crédito/debito
                const itemsNC = [
                    { item: item_servicio_nota_credito, repository: ventasRepository.createItemServicioForNCoD },
                    { item: item_producto_nota_credito, repository: ventasRepository.createItemProductoForNCoD },
                    { item: item_servicio_nota_credito_NC, repository: ventasRepository.createItemServicioForNCoD_NCOD },
                    { item: item_producto_nota_credito_NC, repository: ventasRepository.createItemProductoForNCoD_NCOD },
                ];
                for (const { item, repository } of itemsNC) {
                    if (item && item.length > 0) {
                        const promise = repository(idNCoD, item);
                        operations.push(...promise);
                    }
                }
            } else if (item_servicio_factura_venta || item_producto_factura_venta || item_servicio_factura_venta_excenta || item_producto_factura_venta_excenta) {
                // Segundo camino: Factura venta y excenta
                let idFV;
                let idFVE;
                if(item_servicio_factura_venta || item_producto_factura_venta){
                    idFV = await ventasRepository.getFVidByIdDoc(notas_de_credito_debito.idDoc);
                }
                if(item_servicio_factura_venta_excenta || item_producto_factura_venta_excenta){
                    idFVE = await ventasRepository.getFVEidByIdDoc(notas_de_credito_debito.idDoc)
                }
                const itemsFV_FVE = [
                    { item: item_servicio_factura_venta, repository: ventasRepository.createItemServicioFV, id: idFV },
                    { item: item_producto_factura_venta, repository: ventasRepository.createItemProductoFV, id: idFV },
                    { item: item_servicio_factura_venta_excenta, repository: ventasRepository.createItemServicioFVE, id: idFVE },
                    { item: item_producto_factura_venta_excenta, repository: ventasRepository.createItemProductoFVE, id: idFVE },
                ];
                for (const { item, repository, id } of itemsFV_FVE) {
                    if (item && item.length > 0) {
                        const promise = repository(id, item);
                        operations.push(...promise);
                    }
                }
        } else {
            throw new CustomError(400, "Bad Request", "No se proporcionaron items válidos para procesar");
        }
            const result = await executeTransactions(operations);
            const resultDTE = await DTEService.createNCOD(data)
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE MONTO) completas con éxito", result, DTE: resultDTE };
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
export default new VentasService()