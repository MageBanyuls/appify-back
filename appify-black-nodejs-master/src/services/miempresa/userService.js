import UserRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import { sendEmail } from "../../utils/email/emailService.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { isValidPassword } from "../../utils/password/hashPass.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { sendEmailBienvenida } from "../../utils/email/emailService.js";
import ItemSistemaRepository from '../../persistence/repositorys/miempresa/configs/sistemaRepository.js'
//Clase que interactua con el Repository y se encarga de la logica de negocio
class UserService {
    //Me trae un sub usuario por su id
    async getSubUserById(subUserId) {
        try {
            
            const subUser = await UserRepository.findsubUserById(subUserId);
            if (!subUser) {
                throw new CustomError(404, "El usuario no existe", { id: subUserId });
            }
            return subUser;
        } catch (error) {
            throw error;
        }
    }
    async getAllUsersActivos(userId) {
        try {
            const users = await UserRepository.getAllUsersActivos(userId);
            if (users.length === 0) {
                throw new CustomError(404, "No se encontraron usuarios");
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
    async getAllUsersInactivos(userId) {
        try {
            const users = await UserRepository.getAllUsersInactivos(userId);
            if (users.length === 0) {
                throw new CustomError(404, "No se encontraron usuarios");
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
    //Me trae un sub usuario por su id
    async getDataUser(subUserId) {
        if (!subUserId) {
            throw new CustomError(400,"Bad Request", "El ID del subusuario no puede estar vacío");
        }
        try {
            const permisos = await UserRepository.getUserPermissions(subUserId);
            if (!permisos) {
                throw new CustomError(404, "El usuario no tiene permisos", { id: subUserId });
            }
            const newPermisos = await this.formatPermissions(permisos);
            const userdata = await userRepository.findsubUserById(subUserId)
            if (!userdata) {
                throw new CustomError(404, "Subusuario no encontrado", { id: subUserId });
            }
            const user = {
                nombre: userdata.nombre,
                apellido: userdata.apellido,
                email: userdata.email,
                celular: userdata.celular,
                fecha_de_nacimiento: userdata.fecha_de_nacimiento,
                cargo: userdata.cargo
            }
            return [user,newPermisos];
        } catch (error) {
            throw error;
        }
    }
    //
    async resetPasswordUserPrincipal(data, passwordHashed){
        try {
            const {
                IdSuperUser,
                IdSubUser
            } = data
            let op = [];
            const updateUserPromise = UserRepository.resetPasswordUserOP(IdSuperUser, passwordHashed)
            const updateSubUserPromise = UserRepository.resetPasswordSubUserOP(IdSubUser, passwordHashed)
            op.push(updateUserPromise, updateSubUserPromise)
            await executeTransactions(op)
            return "Transacciones para User-SubUser completadas correctamente"
        } catch (error) {
            throw error
        }
    }
    //Realiza la creacion de contraseña para un nuevo sub usuario
    async createPasswordForSubUser(subUserId, passwordHashed) {
        try {
            await UserRepository.resetPasswordSubUser(subUserId, passwordHashed);
            return (`Contraseña del usuario con id: ${subUserId} creada correctamente`);
        } catch (error) {
            throw error;
        }
    }
    //Esta funcion recibe los permisos y los setea en un formato mas legible para la respuesta
    async formatPermissions(permisos) {
        let estructuraDiccionarios = [];
        permisos.forEach(dato => {
            let categoria = dato.categoria;
            let subcategoria = dato.subcategoria;
            let inactivo = dato.inactivo;
            let ver = dato.ver;
            let administrar = dato.administrar;
            let todo = dato.todo;
            let propietario = dato.propietario;
            // Verificar si la categoría ya existe en la estructura de diccionarios
            let categoriaExistente = estructuraDiccionarios.find(item => item.categoria === categoria);
            // Si la categoría no existe, agregarla con su primera subcategoría
            if (!categoriaExistente) {
                estructuraDiccionarios.push({
                    categoria: categoria,
                    subcategorias: [{
                        nombre: subcategoria,
                        options: [
                            { nombre: "inactivo", select: inactivo },
                            { nombre: "ver", select: ver },
                            { nombre: "administrar", select: administrar },
                            { nombre: "todo", select: todo },
                            { nombre: "propietario", select: propietario }
                        ]
                    }]
                });
            } else {
                // Si la categoría ya existe, buscarla y agregar la subcategoría
                let subcategoriaExistente = categoriaExistente.subcategorias.find(item => item.nombre === subcategoria);
                if (!subcategoriaExistente) {
                    categoriaExistente.subcategorias.push({
                        nombre: subcategoria,
                        options: [
                            { nombre: "inactivo", select: inactivo },
                            { nombre: "ver", select: ver },
                            { nombre: "administrar", select: administrar },
                            { nombre: "todo", select: todo },
                            { nombre: "propietario", select: propietario }
                        ]
                    });
                }
            }
        });
        return estructuraDiccionarios
    }
    //Realiza el log in del usuario
    async login(email, password) {
        try {
            const user = await UserRepository.findUserByEmail(email);
            if (!user) {
                throw new CustomError(401, "Authentication error", { detail: "Invalid credentials" });
            }
            const validPassword = isValidPassword(user, password);
            if (!validPassword) {
                throw new CustomError(401, "Authentication error", { detail: "Invalid credentials" });
            }
            // Obtener permisos antes de generar el token
            let permisos;
            if (user.ref_superusuario === 0) {
                permisos = await UserRepository.getUserPermissions(user.id);
                permisos = await this.formatPermissions(permisos);
            } else {
                permisos = "all";
            }
            //Agregar las configs de sistema y empresa al token
            const dataEmpresaUser = await ItemSistemaRepository.getEmpresaYSistemaByUserId(user.user)
            // Incluir toda la información del usuario y sus permisos en el token
            const tokenData = {
                id: user.id,
                email: user.email,
                userType: user.ref_superusuario === 0 ? 'subusuario' : 'superusuario',
                permisos: permisos,
                data: user,
                empresaId: dataEmpresaUser[0].empresa,
                RUT: dataEmpresaUser[0].RUT
            };
            const token = jwt.sign(tokenData, process.env.SECRET_KEY_LOGIN); // Utiliza una clave secreta adecuada
            // Devolver la información del usuario junto con el token
            return {
                token
            };
        } catch (error) {
            throw error;
        }
    }
    //Realiza el registro de usuario
    async signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash) {
        try {
            //Verifica si existe, y si no, lo crea
            const userExists = await UserRepository.userExists(email);
            if(userExists){
                throw new CustomError(409, 'El usuario ya existe', { email });
            }
            const result = await UserRepository.createUserAndSubuser(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash);
            const objIds = {
                IdSuperUser: result[0].id,
                IdSubUser: result[1].id
            }
            const resultEmail =  sendEmail(email, objIds)
            return { ok: true, message: 'Usuario y subusuario creados exitosamente, se envio el mail de confirmacion', resultEmail };
        } catch (error) {
            throw error
        }
    }
    //Realiza el registro de un subusuario, la creacion de los permisos y posterior envia el email de bienvenida
    async signUpSubUsuario(user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo, permisos) {
        try {
            //Verifica si existe, y si no, realiza la generacion de su id, y posterior lo crea 
            const subUserExists = await UserRepository.subUserExists(email);
            if (subUserExists) {
                throw new CustomError(409, 'Subusuario ya existente');
            }    
            const id = idgenerate("sub-user");
            const createUserOperation = UserRepository.createSubUser(id, user, nombre, apellido, email, celular, fecha_de_nacimiento, cargo);
            const createPermisosOperations = UserRepository.createPermisos(permisos, id);
            //Se juntan las operaciones como transaction, si una falla, se revierten todos los cambios hechos a la db
            await executeTransactions([createUserOperation, ...createPermisosOperations]);
            await sendEmail(email, id);
            return { ok: true, message: 'Subusuario creado y con permisos. Email enviado.' };
        } catch (error) {
            throw (error)
        }
    }
    //Prepara los permisos para hacer update
    //Trae los permisos ya existentes de la db y compara cambios, y solo retorna las diferencias
    async preparePermissionsUpdate(userId, newPermissions) {
        try {
            const currentPermissions = await UserRepository.getUserPermissions(userId);
            const updates = [];
            newPermissions.forEach(newPermiso => {
                const currentPermiso = currentPermissions.find(cp => cp.id === newPermiso.id);
                if (currentPermiso && this.hasDifferences(currentPermiso, newPermiso)) {
                    updates.push({
                        userId: userId,
                        permissionId: currentPermiso.id,
                        data: {
                            inactivo: newPermiso.inactivo,
                            ver: newPermiso.ver,
                            administrar: newPermiso.administrar,
                            todo: newPermiso.todo,
                            propietario: newPermiso.propietario,
                        },
                    });
                }
            });
            return updates;
        } catch (error) {
            throw(error)
        }
    }
    //Verifica si hay diferencias entre los permisos actuales y los nuevos
    //Realiza el cambio a booleanos los permisos que vienen de la db
    hasDifferences(currentPermiso, newPermiso) {
         // Convierte los valores numéricos a booleanos para la comparación
        const toBoolean = (value) => !!value;
        return toBoolean(currentPermiso.inactivo) !== toBoolean(newPermiso.inactivo) ||
            toBoolean(currentPermiso.ver) !== toBoolean(newPermiso.ver) ||
            toBoolean(currentPermiso.administrar) !== toBoolean(newPermiso.administrar) ||
            toBoolean(currentPermiso.todo) !== toBoolean(newPermiso.todo) ||
            toBoolean(currentPermiso.propietario) !== toBoolean(newPermiso.propietario);
    }
    //Realiza un ciclo for para los diferentes permisos
    async updatePermissions(updates) {
        for (const update of updates) {
            await UserRepository.updatePermission(update.userId,update.permissionId, update.data);
        }
    }
    //Realiza el update de sub user, cualquier campo que se quiera actualizar
    async updateSubUserService(userId, updateFields) {
        let existingSubusuario;
        try {
            existingSubusuario = await UserRepository.findsubUserById(userId);
        } catch (error) {
            throw new CustomError(500, 'Error al buscar el subusuario', { detail: error.message });
        }
        if (!existingSubusuario) {
            throw new CustomError(404, 'Subusuario no encontrado');
        }
        const fieldsToUpdate = {};
        Object.keys(updateFields).forEach(field => {
            if (updateFields[field] !== existingSubusuario[field]) {
                fieldsToUpdate[field] = updateFields[field];
            }
        });
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new CustomError(400, 'No hay cambios para actualizar');
        }
        try {
            await UserRepository.updateSubusuario({ id: userId, ...fieldsToUpdate });
            return { success: true, message: 'Subusuario actualizado correctamente' };
        } catch (error) {
            throw error; 
        }
    }
    async updatesSubUserPermisos(userId, permisos) {
        for (const permiso of permisos) {
            const { idPermiso, columnas } = permiso;
            const updates = { ver: false, administrar: false, inactivo: false, todo: false, propietario: false };
            for (const columna of columnas) {
                if (columna === 'todo') {
                    updates.todo = true;
                    updates.propietario = false;
                } else if (columna === 'propietario') {
                    updates.todo = false;
                    updates.propietario = true;
                } else {
                    updates[columna] = true;
                }
            }
            try {
                await UserRepository.updatePermiso(userId, idPermiso, updates);
            } catch (error) {
                throw new CustomError(500, `Error al actualizar permisos para el usuario ${userId}`, { detail: error.message });
            }
        }
    }
    async userPrincipalExistsById(id) {
        try {
            const response = await userRepository.userExistsById(id)
            return response
        } catch (error) {
            throw error
        }
    }
    async sendEmailBienvenida(email) {
        try {
            const codigos = [
                "S31D",
                "M14C",
                "P03L",
                "A86M",
                "C8HY",
                "L85S",
                "M21S",
                "M20F",
                "Q20G",
                "P20S",
            ]
            // Selecciona un índice aleatorio dentro del rango de la longitud del array
            const codigoAleatorio = codigos[Math.floor(Math.random() * codigos.length)];
            const response = await sendEmailBienvenida(email, codigoAleatorio)
            return response
        } catch (error) {
            throw error
        }
    }
    //Realiza el registro de usuario
    async signUpUsuarioBienvenida(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash) {
        try {
            //Verifica si existe, y si no, lo crea
            const userExists = await UserRepository.userExists(email);
            if(userExists){
                throw new CustomError(409, 'El usuario ya existe', { email });
            }
            const result = await UserRepository.createUserAndSubuserBienvenida(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash);
            return { ok: true, message: 'Usuario y subusuario creados exitosamente', result };
        } catch (error) {
            throw error
        }
    }
}

export default new UserService();