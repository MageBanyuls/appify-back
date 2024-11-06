import proveedorRepository from "../../persistence/repositorys/miempresa/proveedorRepository.js"
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
//Clase que interactua con Repository, se encarga de la logica de negocio
class proveedorService {
    //Crea un proveedor
    async createProveedorService(user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
        persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
        nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas){
        //Verificar si existe el proveedor y el usuario para la empresa
        try {
            const superUserExist = await userRepository.userExistsById(user)
            const proveedorExist = await proveedorRepository.proveedorExistsByRut(rut, user)
            if(proveedorExist || !superUserExist){
                throw new CustomError(400, 'Proveedor ya existente o usuario no válido');
            }
            //Si no existe, crea el proveedor
            const id = idgenerate("prov")
            const proveedor = await proveedorRepository.createProveedor(
            id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable,
            persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario,
            nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas);
            return proveedor  
        } catch (error) {
            throw (error)
        }
    }
    async getProveedoresByUserId(userId) {
        return proveedorRepository.findAllProveedoresByUserId(userId);
    }
    async getProveedorById(idProv) {
        try {
            const proveedor = await proveedorRepository.getProveedorById(idProv);
            if (proveedor === null) {
                throw new CustomError(404, 'No hay proveedor para el user id indicado');
            }
            return proveedor;
        } catch (error) {
            throw error
        }
    }
    async getAllProvAct(userId) {
        try {
            const proveedores = await proveedorRepository.getAllProvAct(userId);
            if (proveedores.length === 0) {
                throw new CustomError(404, 'No hay proveedores para el user id indicado');
            }
            return proveedores;
        } catch (error) {
            throw error
        }
    }
    async getAllProvInact(userId) {
        try {
            const proveedores = await proveedorRepository.getAllProvInact(userId);
            if (proveedores.length === 0) {
                throw new CustomError(404, 'No hay proveedores para el user id indicado');
            }
            return proveedores;
        } catch (error) {
            throw error
        }
    }
    //Actualiza el proveedor mediante su id
    async updateProveedorService(id, updateFields) {
        try {
            const existingProveedor = await proveedorRepository.getProveedorByIdExist(id);
            if (!existingProveedor) {
                throw new CustomError(404, 'Proveedor no encontrado');
            }
            // Comparar y construir el objeto de actualización solo con campos modificados
            const fieldsToUpdate = {};
            Object.keys(updateFields).forEach(field => {
                if (updateFields[field] !== existingProveedor[field]) {
                    fieldsToUpdate[field] = updateFields[field];
                }
            });
            if (Object.keys(fieldsToUpdate).length === 0) {
                throw new CustomError(400, 'No hay cambios para actualizar');
            }
            await proveedorRepository.updateProveedor({id, ...fieldsToUpdate})
            return { success: true, message: 'Proveedor actualizado correctamente' };
        } catch (error) {
            throw (error)
        }
    }
}
export default new proveedorService()