import pagosRepository from "../../persistence/repositorys/administracion/pagosRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import comprasService from "../../services/administracion/comprasService.js"
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import proveedorRepository from "../../persistence/repositorys/miempresa/proveedorRepository.js";
class pagosService {
    async createPagosAll(data) {
        try {
            let pagoFunction;
            if (data.pagos_factura_compra) {
                pagoFunction = this.createPagosFC;
            } else if (data.pagos_factura_nota_credito) {
                pagoFunction = this.createPagosNC;
            } else if (data.pagos_factura_compra_excenta) {
                pagoFunction = this.createPagosFCE;
            } else {
                throw new CustomError(400, "Bad Request", 'Tipo de pago no válido en los datos recibidos');
            }
            // Llamar a la función correspondiente para crear el registro de cobro de factura
            const pagosFC = await pagoFunction(data);
            // Devolver ambos registros como un arreglo
            return [pagosFC];
        } catch (error) {
            throw error;
        }
    }
    async createPagosFC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const pagoId = idgenerate("Pago");
            const pagoFCId = idgenerate("Pago-FC");
            // Extraer datos del objeto data
            const { pagos, pagos_factura_compra } = data;
            // Crear el registro de cobro
            const pago = await pagosRepository.createPagos({ ...pagos, id: pagoId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFCData = { ...pagos_factura_compra, id: pagoFCId, idPago: pagoId };
            // Crear el registro de cobro de factura de venta
            const pagoFC = await pagosRepository.createPagosFC(cobroFCData);
            // Devolver ambos registros como un arreglo
            return [pago, pagoFC];
        } catch (error) {
            throw error;
        }
    }
    async createPagosFCE(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const pagoId = idgenerate("Pago");
            const pagoFCEId = idgenerate("Pago-FCE");
            // Extraer datos del objeto data
            const { pagos, pagos_factura_compra_excenta } = data;
            // Crear el registro de cobro
            const pago = await pagosRepository.createPagos({ ...pagos, id: pagoId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFCEData = { ...pagos_factura_compra_excenta, id: pagoFCEId, idPago: pagoId };
            // Crear el registro de cobro de factura de venta
            const pagoFCE = await pagosRepository.createPagosFCE(cobroFCEData);
            // Devolver ambos registros como un arreglo
            return [pago, pagoFCE];
        } catch (error) {
            throw error;
        }
    }
    async createPagosNC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const pagoId = idgenerate("Pago");
            const pagoNCId = idgenerate("Pago-NC");
            // Extraer datos del objeto data
            const { pagos, pagos_factura_nota_credito } = data;
            // Crear el registro de cobro
            const pago = await pagosRepository.createPagos({ ...pagos, id: pagoId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const pagoNCData = { ...pagos_factura_nota_credito, id: pagoNCId, idPago: pagoId };
            // Crear el registro de cobro de factura de venta
            const pagoNC = await pagosRepository.createPagosNC(pagoNCData);
            // Devolver ambos registros como un arreglo
            return [pago, pagoNC];
        } catch (error) {
            throw error;
        }
    }
    async getPagosAllById(id) {
        const functionsToTry = [
            this.getPagosNCById,
            this.getPagosFCById,
            this.getPagosFCEById
        ];
        for (const func of functionsToTry) {
            try {
                const result = await func(id);
                // Si la función no arroja error y devuelve algo, retornamos el resultado
                return result;
            } catch (error) {
                throw new CustomError(500, "Internal server error", `Error al intentar ejecutar la función ${func.name}:`, error.message)
            }
        }
        // Si ninguna función devuelve nada sin error, lanzamos una excepción
        throw new CustomError(404, "Not Found",'No se encontró ningún pago para el ID proporcionado');
    }
    async findPagosFCByPagoId(id) {
        try {
            return pagosRepository.findPagosFCByPagoId(id);
        } catch (error) {
            throw error
        }
    }
    async findPagosFCEByPagoId(id) {
        try {
            return pagosRepository.findPagosFCEByPagoId(id);
        } catch (error) {
            throw error
        }
    }
    async findPagosNCByPagoId(id) {
        try {
            return pagosRepository.findPagosNCByPagoId(id);
        } catch (error) {
            throw error
        }
    }
    async getPagosFCById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
            if (!pago) {
                throw new CustomError(404, "Not Found",`No se encontró ningún pago con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoFC = await pagosRepository.findPagosFCByPagoId(id);
            if (!pagoFC) {
                throw new Error(`No se encontró ningún pago de factura de compra para el pago con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoFC };
        } catch (error) {
            throw error;
        }
    }
    async getPagosFCEById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
            if (!pago) {
                throw new CustomError(404, "Not Found", `No se encontró ningún pago con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoFCE = await pagosRepository.findPagosFCEByPagoId(id);
            if (!pagoFCE) {
                throw new CustomError(404, "Not Found", `No se encontró ningún pago de factura de compra excenta para el pago con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoFCE };
        } catch (error) {
            throw error;
        }
    }
    async getPagosNCById(id) {
        try {
            // Buscar el cobro
            const pago = await pagosRepository.findPagosById(id);
            if (!pago) {
                throw new CustomError(404, "Not Found",`No se encontró ningún pago con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const pagoNC = await pagosRepository.findPagosNCByPagoId(id);
            if (!pagoNC) {
                throw new CustomError(404, "Not Found", `No se encontró ningún pago de nota de credito para el pago con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { pago, pagoNC };
        } catch (error) {
            throw error;
        }
    }
    async getAllPagosDataByUserId(userId) {
        try {
            let pagos = await this.getAllPagosByUserId(userId);
            const formattedPagos = [];
            for (const pago of pagos) {
                const functionsToTry = [
                    this.findPagosFCByPagoId,
                    this.findPagosFCEByPagoId,
                    this.findPagosNCByPagoId
                ];
                let result = null;
                for (const func of functionsToTry) {
                    try {
                        const proveedor = await proveedorRepository.getProveedorById(pago.proveedorId)
                        const resultado = await func(pago.id);
                        if (resultado) {
                            result = {
                                resultado,
                                proveedor,
                                clave: func.name
                            };
                            break; // Si se encuentra un resultado válido, se sale del bucle
                        }
                    } catch (error) {
                        throw error
                    }
                }
                if (result) {
                    switch (result.clave) {
                        case "findPagosNCByPagoId":
                            const idNotaCredito = result.resultado.idNotaCredito;
                            const notacredito = await pagosRepository.findFCNCById(idNotaCredito);
                            const idDocumentoCompra = notacredito.idDoc
                            const averquees = await comprasService.getFCoFCEbyDC(idDocumentoCompra);
                            const notaCompletaNC = await comprasService.getItemsByNCOD(notacredito.id, averquees[0].tipo);
                            formattedPagos.push({ pago, factura: notaCompletaNC, proveedor: result.proveedor.razon_social });
                            break;
                        case "findPagosFCEByPagoId":
                            const idFacturaCompraE = result.resultado.idFacturaCompraE;
                            const facturacomprae = await pagosRepository.findFCEById(idFacturaCompraE);
                            const facturaFCEcompleta = await comprasService.getFCoFCEbyIdDoc(false, facturacomprae.idDoc);
                            formattedPagos.push({ pago, factura: facturaFCEcompleta, proveedor: result.proveedor.razon_social });
                            break;
                        case "findPagosFCByPagoId":
                            const idFacturaCompra = result.resultado.idFacturaCompra;
                            const facturacompra = await pagosRepository.findFCById(idFacturaCompra);
                            const facturaFCcompleta = await comprasService.getFCoFCEbyIdDoc(facturacompra.idDocCompra, false);
                            formattedPagos.push({ pago, factura: facturaFCcompleta, proveedor: result.proveedor.razon_social });
                            break;
                    }
                }
            }
            return formattedPagos;
        } catch (error) {
            throw error;
        }
    }
    async getAllPagosByUserId(id){
        try {
            return pagosRepository.findAllPagosByUserId(id)
        } catch (error) {
            throw error
        }
    }
    async updatePagos(id, updateData) {
        try {
            return pagosRepository.updatePagos(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updatePagoFC(id, updateData) {
        try {
            return pagosRepository.updatePagosFC(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updatePagoNC(id, updateData) {
        try {
            return pagosRepository.updatePagosNC(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deletePagoFC(id) {
        try {
            const pago = await pagosRepository.findPagosFCByCobroId(id);
            if (!pago) {
                throw new CustomError(404, "Not Found",`No se encontró ningún pago de factura de compra con el ID ${id}`);
            }
            const delPagoFC = await pagosRepository.deletePagosFCByCobroId(pago.id);
            const delPago = await pagosRepository.deletePagos(id);
            return [delPago, delPagoFC];
        } catch (error) {
            throw error;
        }
    }
    async deletePagoNC(id) {
        try {
            const pago = await pagosRepository.findPagosNCByCobroId(id);
            if (!pago) {
                throw new CustomError(404, "Not Found",`No se encontró ningún pago de factura de compra con el ID ${id}`);
            }
            const delPagoFC = await pagosRepository.deletePagosNCByCobroId(pago.id);
            const delPago = await pagosRepository.deletePagos(id);
            return [delPago, delPagoFC];
        } catch (error) {
            throw error;
        }
    }
}
export default new pagosService()