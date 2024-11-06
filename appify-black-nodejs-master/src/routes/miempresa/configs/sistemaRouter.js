import { Router } from "express";
import { 
    updateSistemaController, 
    updateEmpresaController,
    getSistemaYEmpresaByUserIdController
} from "../../../controllers/miempresa/configs/sistemaController.js";
const router = new Router()


router.put('/upd/sistema/:id', updateSistemaController)
router.get('/:userId', getSistemaYEmpresaByUserIdController)
router.put('/upd/empresa/:id', updateEmpresaController)

export default router