import { ResponseHandler } from "../../utils/dependencys/injection.js";
import { crearFacturaSimple } from "../../services/dte/dteFunctions.js";
import dteTemporal from "../../services/dte/dteTemporal.js";
import DtePayloadBuilder from "../../services/dte/dtePayloadBuilder.js";
import dteReal from "../../services/dte/dteReal.js";
export const emitirDTEtemporalController = async (req, res) => {
    try {
        const factura = crearFacturaSimple(req.body);
        //console.log(JSON.stringify(factura, null, 2));
        const dte0 = await dteTemporal.postData(factura);
        //console.log("DEBUG DEL DTE TEMPORAL POST", dte0);
        const dte1 = await dteReal.emit(dte0);
        //console.log("DEBUG DEL DTE REAL POST", dte1);
        ResponseHandler.Ok(res, dte1)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
// export const emitirDTEtemporalController = async (req, res) => {
//     try {
//         const result = await dteTemporal.postData(req.body);
//         ResponseHandler.Ok(res, result)
//     } catch (error) {
//         ResponseHandler.HandleError(res,error)
//     }
// }

export const testDTEtemporalPARAMS = async (req, res) => {
    try {
        const {codigo, dte, emisor, receptor} = req.query;
        const result = await dteTemporal.delete(codigo, dte, emisor, receptor);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const emitirDTERealController = async (req, res) => {
    try {
        const result = await dteReal.emit(req.body);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}

export const dteUpdStatusSII = async (req, res) => {
    try {
        const {tipo, folio, emisor} = req.query;
        const result = await dteReal.updStatusSII(tipo, folio, emisor);
        ResponseHandler.Ok(res, result)
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
//ESTA RUTA ES LA QUE VA A QUEDAR, NO SE TOCA, EL QUE LA TOCA LO MATO, y despues lo culeo
export const getDTEtemporalPDFController = async (req, res) => {
    try {
        const {codigo, dte, emisor, receptor} = req.query;
        const pdfBuffer = await dteTemporal.getPdf(codigo, dte, emisor, receptor);
         // Agregar la marca de agua
        const watermarkedPdfBuffer = await dteTemporal.addWatermark(pdfBuffer, 'NO VÁLIDO COMO FACTURA');
        // Convertir el Uint8Array a un Buffer de Node y enviar como respuesta
        const bufferToSend = Buffer.from(watermarkedPdfBuffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
        res.send(bufferToSend);
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}
export const getDTERealPDF = async (req, res) => {
    try {
        const { dte, emisor, folio} = req.query;
        const pdfBuffer = await dteReal.getPdf( dte, emisor, folio);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
        res.send(pdfBuffer); // Envía el buffer directament
    } catch (error) {
        ResponseHandler.HandleError(res,error)
    }
}