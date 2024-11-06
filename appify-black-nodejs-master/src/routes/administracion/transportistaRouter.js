import { Router } from 'express';
import { 
    createTransportista,
    getTransportistaById,
    getTransportistaByUserId,
    updateTransportista,
    deleteTransportista
} from '../../controllers/administracion/transportistaController.js';
const router = Router();

// Ruta para crear un Transportista
router.post('/crear', createTransportista);

// Ruta para obtener un Transportista con su ID
router.get('/obtener/:idTransportista', getTransportistaById);

// Ruta para obtener todos los Transportistas por ID de usuario
router.get('/todos/:id', getTransportistaByUserId);

// Ruta para actualizar un Transportista
router.put('/actualizar/:idTransportista', updateTransportista);

// Ruta para eliminar un Transportista con su ID
router.delete('/eliminar/:idTransportista', deleteTransportista);

export default router

