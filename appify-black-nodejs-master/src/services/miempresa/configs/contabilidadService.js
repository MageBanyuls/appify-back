import contabilidadRepository from "../../../persistence/repositorys/miempresa/configs/contabilidadRepository.js";
import executeTransactions from "../../../persistence/transactions/executeTransaction.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class ContabilidadService {
    async updateFE(id, inputData) {
        try {
            const camposPermitidos = [
                'recibir_doc_libre_DTE_automatico', 'contrasena_sii', 'folio_factura_excenta','folio_facura', 'folio_factura_compra', 'folio_nota_debito',
                'folio_nota_credito','folio_guia_despacho','folio_boleta_excenta','folio_boleta_fisica','folio_boleta_electronica','set_factura_basica','set_boletas','set_facturas_exportacion','set_facturas_compra'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await contabilidadRepository.updateFE(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async updateCobranza(id, inputData) {
        try {
            const camposPermitidos = [
                'asunto', 'mensaje_nivel_1', 'mensaje_nivel_2', 'mensaje_nivel_3'
            ]
            //Contruyo un objeto de datos solo con los campos permitidos que tambien esten presentes en input data
            let dataToUpdate = {}
            camposPermitidos.forEach(campo =>{
                if (inputData.hasOwnProperty(campo)){
                    dataToUpdate[campo] = inputData[campo]
                }
            })
            if(Object.keys(dataToUpdate).length === 0){
                throw new CustomError(400, "No valid fields provided for update")
            }
            return await contabilidadRepository.updateCobranza(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async UpdateExecuteOperationsModuloAdministracion(data) {
        //Preparar los datos para cada operacion
        // Desestructurar "data" para obtener los datos específicos para cada operación.
        const {
            administracion_impuesto,
            administracion_anticipo,
            administracion_por_clasificar,
            administracion_por_cobrar,
            administracion_por_pagar
        } = data;
        //Agrupar las operaciones, pasando los datos a cada funcion
        const operations = [
            contabilidadRepository.updateModuloAdm(administracion_impuesto.id, administracion_impuesto),
            contabilidadRepository.updateAdmAnticipo(administracion_anticipo.id, administracion_anticipo),
            contabilidadRepository.updateAdmPorClasificar(administracion_por_clasificar.id, administracion_por_clasificar),
            contabilidadRepository.updateAdmPorCobrar(administracion_por_cobrar.id, administracion_por_cobrar),
            contabilidadRepository.updateAdmPorPagar(administracion_por_pagar.id, administracion_por_pagar)
        ]
        try {
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations.map( op => op() ))
            return ("transacciones completas con exito", result)
        } catch (error) {
            throw(error)
        }
    }
    async getItemsByIdEmpresa(idEmpresa) {
        try {
            const res = await contabilidadRepository.getAllItemsContabilidad(idEmpresa)
            const data = res[0]
            let ModuloAdministracion = [];
            const facturacion_electronica = {
                empresa: data.EmpresaID,
                recibir_doc_libre_DTE_automatico: data.recibir_doc_libre_DTE_automatico,
                contrasena_sii: data.contrasena_sii, 
                folio_factura_excenta: data.folio_factura_excenta, 
                folio_facura: data.folio_facura, 
                folio_factura_compra: data.folio_factura_compra, 
                folio_nota_debito: data.folio_nota_debito, 
                folio_nota_credito: data.folio_nota_credito, 
                folio_guia_despacho: data.folio_guia_despacho, 
                folio_boleta_excenta: data.folio_boleta_excenta, 
                folio_boleta_fisica: data.folio_boleta_fisica, 
                folio_boleta_electronica: data.folio_boleta_electronica, 
                set_factura_basica: data.set_factura_basica, 
                set_boletas: data.set_boletas, 
                set_facturas_exportacion: data.set_facturas_exportacion, 
                set_facturas_compra: data.set_facturas_compra 
            }
            const cobranzas = {
                asunto: data.asunto,
                mensaje_nivel_1: data.mensaje_nivel_1,
                mensaje_nivel_2: data.mensaje_nivel_2,
                mensaje_nivel_3: data.mensaje_nivel_3
            };
            const administracion_impuesto = {
                cuenta_impuesto_debito: data.cuenta_impuesto_debito,
                cuenta_impuesto_credito: data.cuenta_impuesto_credito,
                valor_impuesto_retenido: data.valor_impuesto_retenido,
                cuenta_impuesto_no_recuperable: data.cuenta_impuesto_no_recuperable,
                plazo_no_recuperable: data.plazo_no_recuperable,
                cuenta_retencion_impuesto: data.cuenta_retencion_impuesto,
                cuenta_impuesto_especifico: data.cuenta_impuesto_especifico
            };
            const administracion_anticipo = {
                cuenta_anticipo_clientes: data.cuenta_anticipo_clientes,
                cuenta_anticipo_proveedores: data.cuenta_anticipo_proveedores,
                cuenta_balance_apertura: data.cuenta_balance_apertura,
                cuenta_ajuste_cambario: data.cuenta_ajuste_cambario,
                cuenta_boton_pago: data.cuenta_boton_pago,
                cuenta_beneficios_defecto: data.cuenta_beneficios_defecto
            };
            const administracion_por_clasificar = {
                cuenta_documentos_pendientes_clasificar: data.cuenta_documentos_pendientes_clasificar
            }
            const administracion_por_cobrar = {
                cuenta_facturas_por_cobrar: data.cuenta_facturas_por_cobrar,
                cuenta_documentos_en_cartera_por_cobrar: data.cuenta_documentos_en_cartera_por_cobrar
            }
            const administracion_por_pagar = {
                cuenta_honorarios_por_pagar: data.cuenta_honorarios_por_pagar,
                cuenta_facturas_por_pagar: data.cuenta_facturas_por_pagar,
                cuenta_vouchers_por_pagar: data.cuenta_vouchers_por_pagar,
                cuenta_documentos_por_pagar: data.cuenta_documentos_por_pagar
            };
            ModuloAdministracion.push({administracion_impuesto: administracion_impuesto}, {administracion_anticipo: administracion_anticipo}, {administracion_por_clasificar: administracion_por_clasificar}, {administracion_por_cobrar: administracion_por_cobrar}, {administracion_por_pagar: administracion_por_pagar})
            return [{facturacion_electronica},{cobranzas}, {ModuloAdministracion: ModuloAdministracion}]
        } catch (error) {
            throw(error)
        }
    }
}
export default new ContabilidadService()