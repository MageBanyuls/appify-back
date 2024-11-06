import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
//Clase que interactua con la db, se encarga de las querys sql
class proveedorRepository {
    //Creacion de un proveedor
    async createProveedor(id, user, rut, razon_social, activo, giro, condicion_de_pago, nombre_fantasia, cuenta_contable, persona, direccion, email, comuna, telefono, ciudad, banco, nombre_beneficiario, nombre_cuenta, rut_beneficiario, nro_cta_corriente, correo_cobranzas) {
        try {
            const response = await prisma.proveedores.create({
                data: {
                    id,
                    user,
                    rut, 
                    razon_social,
                    activo,
                    giro,
                    condicion_de_pago,
                    nombre_fantasia,
                    cuenta_contable,
                    persona,
                    direccion,
                    email,
                    comuna,
                    telefono,
                    ciudad,
                    banco,
                    nombre_beneficiario,
                    nombre_cuenta,
                    rut_beneficiario,
                    nro_cta_corriente,
                    correo_cobranzas
                }
            })
            return response
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Busca el proveedor por su rut y devuelve true o false
    async proveedorExistsByRut(rutProveedor, user) {
        try {
            const proveedor = await prisma.proveedores.findFirst({
                where: {
                    rut: rutProveedor,
                    user: user
                },
            })
            return proveedor !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Trae el proveedor mediante el ID
    async getProveedorById(idProv){
        try {
            const proveedor = await prisma.proveedores.findUnique({
                where: {
                    id: idProv,
                },
            })
            return proveedor
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //OBTENER TODOS LOS PROVEEDORES POR USER ID PARA LA AGOS   
    async findAllProveedoresByUserId(userId) {
        try {
            return prisma.proveedores.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Actualiza un proveedor
    //Se hace una query custom para tomar los campos a actualizar y colocarlos en la query
    async updateProveedor({ id, ...fieldsToUpdate }) {
        try {
            const proveedorUpdated = await prisma.proveedores.update({
                where: {
                    id: id
                },
                data: fieldsToUpdate,
            })
            return proveedorUpdated
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getProveedorByIdExist(idProv) {
        try {
            const proveedor = await prisma.proveedores.findUnique({
                where: {
                id: idProv 
                }
            });
            return proveedor;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllProvAct(userId) {
        try {
            const proveedores = await prisma.proveedores.findMany({
                select: {
                    id: true,
                    rut: true,
                    razon_social: true,
                    telefono: true,
                    email: true,
                    cuenta_contable: true
                },
                where: {
                    activo: true,
                    user: userId
                }
            });
            return proveedores
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllProvInact(userId) {
        try {
            const proveedores = await prisma.proveedores.findMany({
                select: {
                    id: true,
                    rut: true,
                    razon_social: true,
                    telefono: true,
                    email: true,
                    cuenta_contable: true
                },
                where: {
                    activo: false,
                    user: userId
                }
            });
            return proveedores
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new proveedorRepository()