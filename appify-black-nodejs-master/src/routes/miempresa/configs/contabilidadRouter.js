import { Router } from "express";
import { createCobranzasController,updateAdmModulos, createFEController, createAdmModulos, updateCobranzasController, updateFEController, getItemsByIdEmpresaController } from "../../../controllers/miempresa/configs/contabilidadController.js";
const router = Router()

router.post('/fe', createFEController)
router.put('/fe/:id', updateFEController)
router.post('/cobranza', createCobranzasController)
router.put('/cobranza/:id', updateCobranzasController)
router.post('/modulo-adm', createAdmModulos)
router.put('/modulo-adm', updateAdmModulos)


router.get('/all/:idEmpresa', getItemsByIdEmpresaController)

export default router