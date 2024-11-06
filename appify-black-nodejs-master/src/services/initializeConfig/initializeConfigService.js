import ItemSistemaRepository from "../../persistence/repositorys/miempresa/configs/sistemaRepository.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
import comercialRepository from "../../persistence/repositorys/miempresa/configs/comercialRepository.js";
import contabilidadRepository from "../../persistence/repositorys/miempresa/configs/contabilidadRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class initConfigService {
    async initForNewUser(data) {
        try {
            const { empresa, sistema, empresa_proyecto } = data;
            let operations = [];
            const empresaId = idgenerate("empresa");
            // Crear empresa y sistema
            operations.push(ItemSistemaRepository.createEmpresa(empresaId, empresa));
            operations.push(ItemSistemaRepository.createSistema(empresaId, sistema));
            // Configuración comercial
            operations.push(comercialRepository.createProyecto(empresaId, empresa_proyecto));
            operations.push(comercialRepository.createParaClientes(empresaId));
            // Configuración contabilidad
            operations.push(contabilidadRepository.createFE(empresaId));
            operations.push(contabilidadRepository.createCobranza(empresaId));
            // Módulo de administración, esperar respuesta antes de seguir (si es necesario)
            const resultModuloAdm = await this.executeOperationsModuloAdministracion(empresaId, data);
            // Ejecutar todas las operaciones en paralelo
            const result = await executeTransactions(operations)
            return [resultModuloAdm, result];
        } catch (error) {
            throw(error)
        }
    }
    async executeOperationsModuloAdministracion(empresaId) {
        //Preparar los datos para cada operacion
        // Desestructurar "data" para obtener los datos específicos para cada operación.
        // const {
        //     administracion_impuesto,
        //     administracion_anticipo,
        //     administracion_por_clasificar,
        //     administracion_por_cobrar,
        //     administracion_por_pagar
        // } = data;
        //Agrupar las operaciones, pasando los datos a cada funcion
        const operations = [
            contabilidadRepository.createModuloAdm(empresaId),
            contabilidadRepository.createAdmAnticipo(empresaId),
            contabilidadRepository.createAdmPorClasificar(empresaId),
            contabilidadRepository.createAdmPorCobrar(empresaId),
            contabilidadRepository.createAdmPorPagar(empresaId)
        ]
        try {
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations.map( op => op() ))
            return ("transacciones Mudulos Administracion creadas con exito", result)
        } catch (error) {
            throw(error)
        }
    }
}
export default new initConfigService()