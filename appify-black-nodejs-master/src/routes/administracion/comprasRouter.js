import { Router } from "express";
import { 
    createFCController,
    createFCEController,
    createNCoDConItemsController,
    getAllDocumentosComprasController,
    getDocumentosCompraByUserController,
    getFCbyIdDocController,
    getFCEbyIdDocController,
    getNCODbyIdDocController,
    getItemsNCODbyIdNCODController,
    testController,
    getAllDataComprasByUserId,
    getAllDataAgosComprasByUserId
} from "../../controllers/administracion/comprasController.js";
const router = Router()


router.post('/compras/FC', createFCController)
router.get('/compras/FC/:fcDCID', getFCbyIdDocController)


router.post('/compras/FCE', createFCEController)
router.get('/compras/FCE/:fceDCID', getFCEbyIdDocController)


router.post('/compras/NCOD', createNCoDConItemsController)
router.get('/compras/NCOD/:DCID', getNCODbyIdDocController)


//Hay pasar el tipo de nota (FC-FCE-NC) y el id de la nota de credito referido a ese doc
//Trae el documento (FC-FCE-NC) y su respectiva nota de credito/debito asociada mediante el id de NCOD
router.get('/compras/NCOD/:tipoNota/:NCOD', getItemsNCODbyIdNCODController)


router.get('/compras/DC', getAllDocumentosComprasController);
router.get('/compras/DC/:user', getDocumentosCompraByUserController);
router.get('/compras/alldata/:user', getAllDataAgosComprasByUserId);



//test
router.get('/test/:idDocumentoCompra', testController)








export default router