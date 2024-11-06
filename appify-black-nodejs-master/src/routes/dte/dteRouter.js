import Router from 'express'
import { emitirDTEtemporalController,dteUpdStatusSII,emitirDTERealController,getDTERealPDF, getDTEtemporalPDFController, testDTEtemporalPARAMS } from '../../controllers/dte/docTemporalController.js'
const router = Router()
//RUTAS DE TEST
router.get('/test', emitirDTEtemporalController)
router.get('/testDTEReal', emitirDTERealController)
router.get('/test3', testDTEtemporalPARAMS)


//ruta del pdf
router.get('/pdf-dteTemp', getDTEtemporalPDFController)
router.get('/pdf-dteReal', getDTERealPDF)
//Actualizar estado en el SII del DTE
router.get('/updStatus', dteUpdStatusSII)

export default router