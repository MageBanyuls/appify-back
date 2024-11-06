import { connectionDB } from "../../db/connection.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../../utils/id/idGenerate.js";
import executeTransactions from "../../transactions/executeTransaction.js";
import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
//Clase que interactua con la db mediante las querys a las diferentes tablas
class UserRepository {
    //Encuentra un usuario mediante su email y password
    async findUserByEmail(email) {
        try {
            const user = await prisma.subusuarios.findFirst({
                where: {
                    email: email,
                }
            });
            if(!user){
                throw new CustomError(404, "User not found", {email, message: "No user found with provided email and password."})
            }
            return user;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async findUserByID_nombre_apellido(id) {
        try {
            const user = await prisma.subusuarios.findUnique({
                where: {
                    id: id
                },
                select: {
                    nombre: true,  
                    apellido: true
                }
            });
            if(!user){
                throw new CustomError(404, "User not found", {email, message: "No user found with provided email and password."})
            }
            return user ? user : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Trae los diferentes permisos segun el id de usuario
    async getUserPermissions(userId) {
        try {
            const permisos = await prisma.$queryRaw`SELECT permisos.categoria, permisos.subcategoria, permisos.id, permisos_de_usuario.inactivo, permisos_de_usuario.ver, permisos_de_usuario.administrar, permisos_de_usuario.todo, permisos_de_usuario.propietario FROM permisos INNER JOIN permisos_de_usuario ON permisos_de_usuario.idPermiso = permisos.id WHERE permisos_de_usuario.user = ${userId}`
            return permisos;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Realiza update de permisos
    async updatePermission(userId, permissionId, data) {
        try {
            await prisma.permisos_de_usuario.updateMany({
                where: {
                    idPermiso: parseInt(permissionId),
                    user: userId.toString(), //user es un VARCHAR
                },
                data,
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Actualiza un sub usuario
    async updateSubusuario({ id, ...fieldsToUpdate }) {
        try {
            const result = await prisma.subusuarios.update({
                where: { id: id },
                data: fieldsToUpdate
            });
            return result;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Verifica si el usuario existe por su email y devuelve true o false
    async userExists(email) {
        try {
            const response = await prisma.usuarios.findFirst({  
                where:{
                    email : email
                }
            })
            return response !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Verifica si el sub usuario existe por su email y devuelve true o false
    async subUserExists(email) {
        try {
            const response = await prisma.subusuarios.findFirst({  
                where:{
                    email : email
                }
            })
            return response;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Verifica si el usuario existe por su id y devuelve true o false
    async userExistsById(id) {
        try {
            const response = await prisma.usuarios.findUnique({
                where:{
                    id : id
                }
            })
            return response !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Realiza la creacion de usuario y un sub usuario
    async createUserAndSubuser(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash) {
        // Datos para el usuario principal
        let userIDsuperUser = idgenerate("super-user")
        let fecha = new Date(fecha_de_nacimiento)
        let fecha_ISO = fecha.toISOString()
        let userData = {
            id: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            password: passwordHash,
            activo: false,
        };
        // Datos para el subusuario
        let subUserData = {
            id: idgenerate("sub-user"), // Prefijo para distinguir el ID del subusuario
            user: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            cargo: "Administrador",
            ref_superusuario: 1,
            checkeado: 1,
            password: passwordHash,
            activo: false,
        };
        // Preparando las operaciones para la transacción
        const operations = [
            prisma.usuarios.create({ data: userData }),
            prisma.subusuarios.create({ data: subUserData })
        ];
        try {
            const resultOp = await executeTransactions(operations)
            return resultOp
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Realiza la creacion de sub usuario
    // No se captura el error aquí porque se manejará en la transacción
    createSubUser(id,user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo) {
        let fecha = new Date(fecha_de_nacimiento)
        let fecha_ISO = fecha.toISOString()
        try {
            return prisma.subusuarios.create({
                data: {
                    id: id,
                    user:user,
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    celular: celular,
                    fecha_de_nacimiento: fecha_ISO,
                    cargo: cargo,
                    ref_superusuario:0,
                    checkeado:0,
                    password: null
                }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Busca el subusuario por su id y lo retorna
    async findsubUserById(id) {
        try {
            const rows = await prisma.subusuarios.findUnique({
                where:{
                    id : id
                }
            })
            return rows;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllUsersActivos(userId) {
        try {
            const subusuarios = await prisma.subusuarios.findMany({
                select: {
                    id: true,
                    nombre: true,
                    cargo: true,
                    email: true
                },
                where: {
                    activo: true,
                    user: userId
                }
            });
            return subusuarios;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllUsersInactivos(userId) {
        try {
            const subusuarios = await prisma.subusuarios.findMany({
                select: {
                    id: true,
                    nombre: true,
                    cargo: true,
                    email: true
                },
                where: {
                    activo: false,
                    user: userId
                }
            });
            return subusuarios;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    resetPasswordUserOP(idUser, passwordHashed){
        try {
            return prisma.usuarios.update({
                where: {id : idUser},
                data: {
                    password: passwordHashed,
                    activo: true
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Realiza un update a la password del subUser
    resetPasswordSubUserOP(id, passwordHashed) {
        try {
            return prisma.subusuarios.update({
                where: { id: id },
                data: {
                    password: passwordHashed,
                    checkeado: 1,
                    activo: true,
                    ref_superusuario: 1
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Realiza un update a la password del subUser
    async resetPasswordSubUser(id, passwordHashed) {
        try {
            await prisma.subusuarios.update({
                where: { id: id },
                data: {
                    password: passwordHashed,
                    checkeado: 1,
                    activo: true
                }
            });
            return "Contraseña de sub user actualizada";
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Actualiza los permisos de usuario
    async updatePermiso(user, idPermiso, updates) {
        try {
            const columnsToUpdate = Object.keys(updates).map(column => `${column} = ?`).join(', ');
            const values = [...Object.values(updates), user, idPermiso];
            const query = `UPDATE permisos_de_usuario SET ${columnsToUpdate} WHERE user = ? AND idPermiso = ?`;
            const [rows] = await connectionDB.execute(query, values);
            return rows;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Crea los permisos en la tabla permisos_de_usuario
    // No se captura el error aquí porque se manejará en la transacción
    createPermisos(permisos, idSubUsuario) {
        try {
            // Devuelve un array de operaciones sin ejecutarlas
            return permisos.map(permiso => prisma.permisos_de_usuario.create({
                data: {
                    idPermiso: permiso.id,
                    user: idSubUsuario,
                    inactivo: permiso.inactivo,
                    ver: permiso.ver,
                    administrar: permiso.administrar,
                    todo: permiso.todo,
                    propietario: permiso.propietario
                }
            }));
        } catch (error) {
            handlePrismaError(error)
        }
    }
    //Elimina un sub user por su id
    async deleteSubUserByID(id) {
        try {
            const rows = await prisma.subusuarios.delete({
                where: {
                    id: id
                }
            });
            return rows;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updatePermisosdeUsuario(userId, idPermiso, updates) {
        try {
            const response = await prisma.permisos_de_usuario.update({
                where: { user: userId, idPermiso: idPermiso },
                data: updates
            });
            return response;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Edita los permisos de los sub usuarios
    async editarPermisos(id) {
        try {
            const rows = await prisma.subusuarios.findUnique({
                where:{
                    id : id
                }
            })
            return rows;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    //Realiza la creacion de usuario y un sub usuario
    async createUserAndSubuserBienvenida(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash) {
        // Datos para el usuario principal
        let userIDsuperUser = idgenerate("super-user")
        let fecha = new Date(fecha_de_nacimiento)
        let fecha_ISO = fecha.toISOString()
        let userData = {
            id: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            password: passwordHash,
            activo: true,
        };
        // Datos para el subusuario
        let subUserData = {
            id: idgenerate("sub-user"), // Prefijo para distinguir el ID del subusuario
            user: userIDsuperUser,
            nombre,
            apellido,
            email,
            celular,
            fecha_de_nacimiento: fecha_ISO,
            cargo: null,
            ref_superusuario: 1,
            checkeado: 1,
            password: passwordHash,
            activo: true,
        };
        // Preparando las operaciones para la transacción
        const operations = [
            prisma.usuarios.create({ data: userData }),
            prisma.subusuarios.create({ data: subUserData })
        ];
        try {
            const resultOp = await executeTransactions(operations)
            return resultOp
        } catch (error) {
            handlePrismaError(error)
        }
    }
}
export default new UserRepository()