import { Router } from 'express';
import { 
    createOrdenCompra,
    getOrdenCompraById,
    getOrdenCompraByUserId,
    updateOrdenCompra,getAllDataOrdenCompraByUserId
} from '../../controllers/operaciones/ordenCompraController.js';
const router = Router();

// Ruta para crear una orden de compra
router.post('/ordenCompra', createOrdenCompra);

// Ruta para obtener una orden de compra con su ID
router.get('/ordenCompra/:id', getOrdenCompraById);

// Ruta para obtener una orden de compra con su ID
router.get('/alldata/:id', getAllDataOrdenCompraByUserId);

// Ruta para obtener todas las ordenes de compra por ID de usuario
router.get('/ordenCompras/:idUser', getOrdenCompraByUserId);

// Ruta para actualizar una orden de compra
router.put('/ordenCompra/:id', updateOrdenCompra);


export default router