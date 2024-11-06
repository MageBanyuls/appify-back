import ConsultaService from "../../services/comercial/ConsultaService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
export const createConsulta = async (req, res) => {
    try {
        const data = req.body;
        const response = await ConsultaService.createConsulta(data);
        ResponseHandler.Ok(res, response)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const getConsultasByUserId = async (req, res) => {
    try {
        const { id } = req.params
        const consultas = await ConsultaService.getConsultasByUserId(id);
        ResponseHandler.Ok(res, consultas)
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const updateConsulta = async (req, res) => {
    try {
        const idString = req.params.idConsulta;  // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idConsulta = parseInt(idString, 10);
        const updateData = req.body;
        await ConsultaService.updateConsulta(idConsulta, updateData); 
        ResponseHandler.Ok(res, 'Consulta actualizada') 
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};
export const deleteConsulta = async (req, res) => {
    try {
        const idString = req.params.idConsulta; // Acceder id.Cosnulta del objeto y llevarlo a int 
        const idConsulta = parseInt(idString, 10);
        await ConsultaService.deleteConsulta(idConsulta);
        ResponseHandler.Ok(res, 'Consulta eliminada') 
    } catch (err) {
        ResponseHandler.HandleError(res, err)
    }
};