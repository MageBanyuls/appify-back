import cobrosRepository from "../../persistence/repositorys/administracion/cobrosRepository.js";
import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import ventasService from "./ventasService.js";
class cobrosService {
    async createCobrosAll(data) {
        try {
            let cobroFunction;
            if (data.cobros_factura_venta) {
                cobroFunction = this.createCobroFV;
            } else if (data.cobros_factura_venta_excenta) {
                cobroFunction = this.createCobroFVE;
            } else if (data.cobros_factura_nota_credito) {
                cobroFunction = this.createCobroNC;
            } else if (data.cobros && !data.cobros_factura_nota_credito) {
                cobroFunction = cobrosRepository.createCobros;
                
            }else if (data.cobros && !data.cobros_factura_venta) {
                cobroFunction = cobrosRepository.createCobros;
                
            }else if (data.cobros && !data.cobros_factura_venta_excenta) {
                cobroFunction = cobrosRepository.createCobros;
                
            } else {
                throw new CustomError(400, "Bad Request", 'Tipo de cobro no válido en los datos recibidos');
            }
            // Llamar a la función correspondiente para crear el registro de cobro de factura
            const cobroFV = await cobroFunction(data);
            // Devolver ambos registros como un arreglo
            return [cobroFV];
        } catch (error) {
            throw error;
        }
    }
    async createCobroFV(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroFVId = idgenerate("Cobro-FV");
            // Extraer datos del objeto data
            const { cobros, cobros_factura_venta } = data;
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVData = { ...cobros_factura_venta, id: cobroFVId, idCobro: cobroId };
            // Crear el registro de cobro de factura de venta
            const cobroFV = await cobrosRepository.createCobrosFV(cobroFVData);
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFV];
        } catch (error) {
            throw error;
        }
    }
    async createCobroFVE(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroFVEId = idgenerate("Cobro-FVE");
            // Extraer datos del objeto data
            const { cobros, cobros_factura_venta_excenta } = data;
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroFVEData = { ...cobros_factura_venta_excenta, id: cobroFVEId, idCobro: cobroId };
            // Crear el registro de cobro de factura de venta
            const cobroFVE = await cobrosRepository.createCobrosFVE(cobroFVEData);
            // Devolver ambos registros como un arreglo
            return [cobro, cobroFVE];
        } catch (error) {
            throw error;
        }
    }
    async createCobroNC(data) {
        try {
            // Generar IDs para el cobro y el cobro de factura de venta
            const cobroId = idgenerate("Cobro");
            const cobroNCId = idgenerate("Cobro-NC");
            // Extraer datos del objeto data
            const { cobros, cobros_factura_nota_credito } = data;
            // Crear el registro de cobro
            const cobro = await cobrosRepository.createCobros({ ...cobros, id: cobroId });
            // Agregar el ID del cobro al objeto de datos para el cobro de factura de venta
            const cobroNCData = { ...cobros_factura_nota_credito, id: cobroNCId, idCobro: cobroId };
            // Crear el registro de cobro de factura de venta
            const cobroNC = await cobrosRepository.createCobrosNC(cobroNCData);
            // Devolver ambos registros como un arreglo
            return [cobro, cobroNC];
        } catch (error) {
            throw error;
        }
    }
    async getCobrosAllById(id) {
        const functionsToTry = [
            this.getCobroFVById,
            this.getCobroFVEById,
            this.getCobroNCById
        ];
        for (const func of functionsToTry) {
            try {
                const result = await func(id);
                // Si la función no arroja error y devuelve algo, retornamos el resultado
                return [result,{nombre : func.name}];
            } catch (error) {
                throw new CustomError(500, "Internal server error", `Error al intentar ejecutar la función ${func.name}`)
            }
        }
        // Si ninguna función devuelve nada sin error, lanzamos una excepción
        throw new CustomError(404, "Not Found",'No se encontró ningún cobro para el ID proporcionado');
    }
    async getCobroFVById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
            if (!cobro) {
                throw new CustomError(404, "Not found", `No se encontró ningún cobro con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroFV = await cobrosRepository.findCobroFVByCobroId(id);
            if (!cobroFV) {
                throw new CustomError(404, "Not found", `No se encontró ningún cobro de factura de venta para el cobro con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroFV };
        } catch (error) {
            throw error;
        }
    }
    async findCobroFVByCobroId(id){
        try {
            return cobrosRepository.findCobroFVByCobroId(id)
        } catch (error) {
            throw error
        }
    }
    async findCobroFVEByCobroId(id){
        try {
            return cobrosRepository.findCobroFVEByCobroId(id)
        } catch (error) {
            throw error
        }
    }
    async findCobroNCByCobroId(id){
        try {
            return cobrosRepository.findCobroNCByCobroId(id)
        } catch (error) {
            throw error
        }
    }
    async getCobroFVEById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
            if (!cobro) {
                throw new CustomError(404, "Not Found", `No se encontró ningún cobro con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroFVE = await cobrosRepository.findCobroFVEByCobroId(id);
            if (!cobroFVE) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro de factura de venta excenta para el cobro con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroFVE };
        } catch (error) {
            throw error;
        }
    }
    async getCobroNCById(id) {
        try {
            // Buscar el cobro
            const cobro = await cobrosRepository.findCobroById(id);
            if (!cobro) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro con el ID ${id}`);
            }
            // Buscar el cobro de factura de venta utilizando el ID del cobro
            const cobroNC = await cobrosRepository.findCobroNCByCobroId(id);
            if (!cobroNC) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro de nota de credito para el cobro con ID ${id}`);
            }
            // Devolver un objeto que contiene ambos resultados
            return { cobro, cobroNC };
        } catch (error) {
            throw error;
        }
    }
    async getCobrosByUserId(userId) {
        try {
            return cobrosRepository.findAllCobrosByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async getAllCobrosDataByUserId(userId) {
        try {
            let cobros = await this.getCobrosByUserId(userId);
            // Verificar si cobros es un array o no
            /*
            if (!Array.isArray(cobros)) {
                cobros = [cobros]; // Convertir a un array para facilitar la iteración
            }*/
            const formattedCobros = [];

            for (const cobro of cobros) {
                const functionsToTry = [
                    this.findCobroFVByCobroId,
                    this.findCobroFVEByCobroId,
                    this.findCobroNCByCobroId
                ];
                let result = null;
                for (const func of functionsToTry) {
                    try {
                        const cliente = await clientesRepository.findClienteById(cobro.clienteId)
                        const resultado = await func(cobro.id);
                        if (resultado) {
                            result = {
                                resultado,
                                cliente,
                                clave: func.name
                            };
                            break; // Si se encuentra un resultado válido, se sale del bucle
                        }
                    } catch (error) {
                        throw new CustomError(500, `Error al intentar ejecutar la función ${func.name}:`, error.message);
                    }
                }
                if (result) {
                    switch (result.clave) {
                        case "findCobroNCByCobroId":
                            const idNotaCredito = result.resultado.idNotaCredito;
                            const notacredito = await cobrosRepository.findNCById(idNotaCredito);
                            const idDocumentoCompra = notacredito.idDoc
                            const averquees = await ventasService.getFVoFVEbyDC(idDocumentoCompra);
                            const notaCompletaNC = await ventasService.getItemsByNCOD(notacredito.id, averquees[0].tipo);
                            formattedCobros.push({ cobro, factura: notaCompletaNC, cliente: result.cliente.razon_social });
                            break;
                        case "findCobroFVEByCobroId":
                            const idFacturaVentaE = result.resultado.idFacturaVentaExcenta;
                            const facturaventae = await cobrosRepository.findFVEById(idFacturaVentaE);
                            const facturaFVEcompleta = await ventasService.getFVoFVEbyIdDoc(false,facturaventae.idDoc);
                            formattedCobros.push({ cobro, factura: facturaFVEcompleta, cliente: result.cliente.razon_social });
                            break;
                        case "findCobroFVByCobroId":
                            const idFacturaVenta = result.resultado.idFacturaVenta;
                            const facturaventa = await cobrosRepository.findFVById(idFacturaVenta);
                            const facturaFVcompleta = await ventasService.getFVoFVEbyIdDoc(facturaventa.idDoc, false);
                            formattedCobros.push({ cobro, factura: facturaFVcompleta, cliente: result.cliente.razon_social });
                            break;
                    }
                }
            }
            return formattedCobros;
        } catch (error) {
            throw error;
        }
    }
    async updateCobro(id, updateData) {
        try {
            return cobrosRepository.updateCobro(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCobroFV(id, updateData) {
        try {
            return cobrosRepository.updateCobroFV(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCobroFVE(id, updateData) {
        try {
            return cobrosRepository.updateCobroFVE(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCobroNC(id, updateData) {
        try {
            return cobrosRepository.updateCobroNC(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteCobroFV(id) {
        try {
            const cobro = await cobrosRepository.findCobroFVByCobroId(id);
            if (!cobro) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            const delCobroFV = await cobrosRepository.deleteCobroFVByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            return [delCobro, delCobroFV];
        } catch (error) {
            throw error;
        }
    }
    async deleteCobroFVE(id) {
        try {
            const cobro = await cobrosRepository.findCobroFVEByCobroId(id);
            if (!cobro) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            const delCobroFV = await cobrosRepository.deleteCobroFVEByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            return [delCobro, delCobroFV];
        } catch (error) {
            throw error;
        }
    }
    async deleteCobroNC(id) {
        try {
            const cobro = await cobrosRepository.findCobroNCByCobroId(id);
            if (!cobro) {
                throw new CustomError(404, "Not Found",`No se encontró ningún cobro de factura de venta con el ID ${id}`);
            }
            const delCobroFV = await cobrosRepository.deleteCobroNCByCobroId(cobro.id);
            const delCobro = await cobrosRepository.deleteCobro(id);
            return [delCobro, delCobroFV];
        } catch (error) {
            throw error;
        }
    }
}
export default new cobrosService()