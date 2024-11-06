import userService from "../../services/miempresa/userService.js";
import { validatePassword } from "../../utils/password/validatesPassword.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
import { createHash } from "../../utils/password/hashPass.js";
import initConfigService from "../../services/initializeConfig/initializeConfigService.js";
//Realiza el registro del usuario 
export const signUpController = async (req, res) => {
    const { nombre, apellido, email, celular, fecha_de_nacimiento, password, passwordConfirm, activo } = req.body;
    const validationResult = validatePassword(password, passwordConfirm)
    try {
        if (!validationResult.isValid){
            return ResponseHandler.HandleError(res, validationResult.message);
        }
        const passwordHash = createHash(password)
        const result = await userService.signUpUsuario(nombre, apellido, email, celular, fecha_de_nacimiento, passwordHash, activo);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}
export const initConfigController = async (req, res) => {
    try {
        const data = {
            empresa: req.body.empresa,
            sistema: req.body.sistema,
            empresa_proyecto: req.body.empresa_proyecto
        };
        const result = await initConfigService.initForNewUser(data);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res, error)
    }
}