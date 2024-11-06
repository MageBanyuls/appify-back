import { Router } from "express";
import { createProveedorController,
    updateProveedorController,
    getProveedoresByUserId,
    getAllProveedoresActController,
    getAllProveedoresInactController,
    getProveedorByIdController
} from "../../controllers/miempresa/proveedorController.js";


const router = Router()

router.post('/createProv', createProveedorController)
//trae los proveedores inactivos y activos por user id
router.get('/allProvAct/:userId', getAllProveedoresActController)
router.get('/allProvInact/:userId', getAllProveedoresInactController)

router.put('/updProv/:id', updateProveedorController)
router.get('/todos/:id', getProveedoresByUserId)

//trae un proveedor por su id
router.get('/:idProv', getProveedorByIdController)

export default router