import { Router } from 'express';
import { 
    createEcommerce,
    getEcommerceById,
    getEcommerceByUserId,
    getEcommerceByCategoryId,
    updateEcommerce,
    deleteEcommerce
} from '../../controllers/comercial/ecommerceController.js';
const router = Router();

// Ruta para crear un ecommerce
router.post('/ecommerce', createEcommerce);

// Ruta para obtener un ecommerce con su ID
router.get('/ecommerce/:idEcommerce', getEcommerceById);

// Ruta para obtener todos los ecommerce por ID de usuario
router.get('/ecommerces/:idUser', getEcommerceByUserId);

// Ruta para obtener todos los ecommerce por ID de usuario y categoria en el body.
router.get('/ecommercecat/:idUser', getEcommerceByUserId);

// Ruta para actualizar un ecommerce
router.put('/ecommerce/:idEcommerce', updateEcommerce);

// Ruta para eliminar un ecommerce con su ID
router.delete('/ecommerce/:idEcommerce', deleteEcommerce);

export default router

