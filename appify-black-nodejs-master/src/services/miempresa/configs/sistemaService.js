import ItemSistemaRepository from "../../../persistence/repositorys/miempresa/configs/sistemaRepository.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class ItemsSistemaService {
    async updateSistema(id, inputData) {
        try {
            const camposPermitidos = [
                'empresa', 'pais', 'idioma','correo_cobranza', 'moneda', 'moneda_secundaria',
                'con_decimales', 'tasa_venta', 'tasa_compra', 'tasa_cambio', 'tolerancia',
                'registro_entregas_autocompletar'
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
            return await ItemSistemaRepository.updateSistema(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async updateEmpresa(id, inputData) {
        try {
            const camposPermitidos = [
                'nombre', 'direccion_matriz', 'direccion_bodega','prefijo_tel', 'RUT', 'giro',
                'pagina_web', 'prefijo_cel', 'logo'
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
            return await ItemSistemaRepository.updateEmpresa(id, dataToUpdate)
        } catch (error) {
            throw(error)
        }
    }
    async getSistemaYEmpresaByUserId(userId) {
        try {
            const obj = await ItemSistemaRepository.getEmpresaYSistemaByUserId(userId)
            const response = obj[0]
             // Separar los datos en dos objetos, uno para empresa y otro para sistema
            const empresa = {
                id: response.id,
                user: response.user,
                logo: response.logo,
                nombre: response.nombre,
                direccion_matriz: response.direccion_matriz,
                direccion_bodega: response.direccion_bodega,
                prefijo_tel: response.prefijo_tel,
                RUT: response.RUT,
                giro: response.giro,
                pagina_web: response.pagina_web,
                prefijo_cel: response.prefijo_cel
            };
            const sistema = {
                id: response.id, // Asegurarse de obtener el ID correcto si sistema también tiene un ID que se sobrescribe
                empresa: response.empresa,
                pais: response.pais,
                idioma: response.idioma,
                correo_cobranza: response.correo_cobranza,
                moneda: response.moneda,
                moneda_secundaria: response.moneda_secundaria,
                con_decimales: response.con_decimales,
                tasa_venta: response.tasa_venta,
                tasa_compra: response.tasa_compra,
                tasa_cambio: response.tasa_cambio,
                tolerancia: response.tolerancia,
                registro_entregas_autocompletar: response.registro_entregas_autocompletar
            };
            // Retornar ambos objetos en un objeto estructurado
            return { empresa, sistema };
        } catch (error) {
            throw(error)
        }
    }
    
}
export default new ItemsSistemaService()