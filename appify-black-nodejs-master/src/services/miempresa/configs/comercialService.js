import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import ComercialRepositoy from "../../../persistence/repositorys/miempresa/configs/comercialRepository.js";
import comercialRepository from "../../../persistence/repositorys/miempresa/configs/comercialRepository.js";
class comercialService {
    async updateProyecto(id, inputData) {
        try {
            const camposPermitidos = [
                'valor_impuesto', 'porcentaje_de_ot', 'texto_para_compartir_proyecto','cotizacion_descuento_visible', 'nombre_impuesto', 'logo'
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
            return await ComercialRepositoy.updateProyecto(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async updateParaClientes(id, inputData) {
        try {
            const camposPermitidos = [
                'texto_inferior_firma', 'mensaje_envio_proyecto', 'texto_confirmacion_compra'
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
            return await ComercialRepositoy.updateParaClientes(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async getProyectoYParaClientes(empresaId) {
        try {
            const result = await comercialRepository.getProyectoYParaClientes(empresaId)
            if(!result){
                throw new CustomError(404, "No se encontro el elemento solicitado")
            }
            if(result.length === 0){
                throw new CustomError(404, "No se encontro el elemento solicitado")
            }
            const data = result[0]
            const proyecto = {
                EmpresaID: data.EmpresaID,
                valor_impuesto: data.valor_impuesto,
                logo: data.logo,
                porcentaje_de_ot: data.porcentaje_de_ot,
                texto_para_compartir_proyecto: data.texto_para_compartir_proyecto,
                cotizacion_descuento_visible: data.cotizacion_descuento_visible,
                nombre_impuesto: data.nombre_impuesto
            }
            const para_clientes_proyectos = {
                texto_inferior_firma: data.texto_inferior_firma,
                mensaje_envio_proyecto: data.mensaje_envio_proyecto,
                texto_confirmacion_compra: data.texto_confirmacion_compra
            }
            return [proyecto, para_clientes_proyectos]
        } catch (error) {
            throw(error)
        }
    }
}
export default new comercialService()