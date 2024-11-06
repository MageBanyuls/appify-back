import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import axios from "axios";
import 'dotenv/config'
class dteReal {
    constructor() {
        this.apiUrl = `${process.env.URL_API_PY}`;
    }
    async getData( dte, emisor, folio ) {
        const params = {
            dte: dte,
            emisor: emisor,
            folio: folio
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_emitidos/info`, {params});
            return response.data;
        } catch (error) {
            throw new CustomError(500, "Error fetching data from API",  error.message);
        }
    }
    async emit(payload) {
        try {
            const response = await axios.post(`${this.apiUrl}/dte-real`,  payload);
            return response.data;
        } catch (error) {
            throw new CustomError(500, "Error posting data to API",  error.message);
        }
    }
    async getPdf( dte, emisor, folio) {
        const params = {
            dte: dte,
            emisor: emisor,
            folio: folio
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_emitidos/pdf`, {
                params,
                responseType: 'arraybuffer',
                headers: {
                    'Accept': 'application/pdf'
                }    
            });
            return response.data;
        } catch (error) {
            throw new CustomError(500, "Error fetching data from API",  error.message);
        }
    }
    async updStatusSII(tipo, folio, emisor) {
        try {
            const params = {
                tipo: tipo,
                folio: folio,
                emisor: emisor
            }
            const response = await axios.get(`${this.apiUrl}/dte_emitidos/actualizarestado`, {params});
            return response.data;
        } catch (error) {
             // Verifica si el error es porque la respuesta de axios fue recibida y es un error de servidor
            if (error.response) {
                //console.log("Detalles del error:", error.response.status, error.response.data);
                throw new CustomError(error.response.status, `Error from API: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // El error fue provocado por no recibir respuesta para la solicitud enviada
                throw new CustomError(500, "No response from server");
            } else {
                // Error al configurar la solicitud
                throw new CustomError(500, `Error setting up request: ${error.message}`);
            }
        }
    }
    async delete(tipo, folio, emisor) {
        const params = {
            tipo: tipo,
            folio: folio,
            emisor: emisor
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_emitidos/eliminar`, {
                params  
            });
             // Verifica el tipo de la respuesta para determinar si es un éxito o un error
            if (typeof response.data === 'boolean' && response.data) {
                // Si response.data es true, significa que la eliminación fue exitosa
                return "Documento temporal eliminado correctamente.";
            } else if (response.data && response.data.status && response.data.status !== '200') {
                // Si response.data contiene un estado y no es 200, maneja como error
                const statusCode = parseInt(response.data.status);
                throw new CustomError(statusCode || 500, response.data.message || "Error desconocido");
            } else {
                // Si la respuesta no es ni true ni contiene un status válido, asume un error desconocido
                throw new CustomError(500, "Respuesta inesperada de la API");
            }
        } catch (error) {
            throw error
        }
    }
}

export default new dteReal();