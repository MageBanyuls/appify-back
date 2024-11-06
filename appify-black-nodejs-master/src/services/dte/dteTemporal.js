import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import axios from "axios";
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import 'dotenv/config'
class dteTemporal {
    constructor() {
        this.apiUrl = `${process.env.URL_API_PY}`;
    }
    async getData(codigo, dte, emisor, receptor) {
        const params = {
            codigo: codigo,
            dte: dte,
            emisor: emisor,
            receptor: receptor
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_tmps/info`, {params});
            return response.data;
        } catch (error) {
            throw new CustomError(500, "Error fetching data from API",  error.message);
        }
    }
    async postData( payload) {
        try {
            const response = await axios.post(`${this.apiUrl}/dte-temporal`,  payload);
            return response.data;
        } catch (error) {
            throw new CustomError(500, "Error posting data to API",  error.message);
        }
    }
    async postAndGetData(payload) {
        try {
            const response = await axios.post(`${this.apiUrl}/dte-temporal`,  payload);
            if (response && response.status === 200 && response.data) {
                const res = response.data
                const result = await this.getData(res.codigo, res.dte, res.emisor, res.receptor)
                return result; 
            } else {
                throw new CustomError(404, "Not Found" , "Datos recibidos no son los esperados");
            }
        } catch (error) {
            throw new CustomError(422, "Error posting data to API",  error.message);
        }
    }
    async getPdf(codigo, dte, emisor, receptor) {
        const params = {
            codigo: codigo,
            dte: dte,
            emisor: emisor,
            receptor: receptor
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_tmps/pdf`, {
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
    async addWatermark(pdfBuffer, watermarkText, watermarkText2) {
        // Cargar el PDF en pdf-lib
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        // Obtener las páginas del PDF
        const pages = pdfDoc.getPages();
        // Añadir la marca de agua a cada página
        pages.forEach(page => {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
                x: width / 4,
                y: height / 4,
                size: 35,
                color: rgb(0.75, 0.75, 0.75),
                rotate: degrees(45),
                opacity: 0.5,
            });
        });
        // Serializar el PDF a un nuevo buffer
        return await pdfDoc.save();
    }
    
    async delete(codigo, dte, emisor, receptor) {
        const params = {
            codigo: codigo,
            dte: dte,
            emisor: emisor,
            receptor: receptor
        };
        try {
            const response = await axios.get(`${this.apiUrl}/dte_tmps/eliminar`, {
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

export default new dteTemporal();