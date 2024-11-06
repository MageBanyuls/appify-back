import { Router } from 'express';
import { 
    createCobrosAll,
    getCobrosAllById,
    getAllCobrosByUserId,
    updateCobro,
    updateCobroFV,
    updateCobroFVE,
    updateCobroNC,
    deleteCobroFV,
    deleteCobroFVE,
    getAllCobrosDataByUserId,
    deleteCobroNC
} from '../../controllers/administracion/cobrosController.js';
const router = Router();

// Ruta para crear un cobro cualquiera
router.post('/crear', createCobrosAll);

// Ruta para obtener un cobro cualquiera con su ID
router.get('/obtener/:id', getCobrosAllById);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/todos/:id', getAllCobrosByUserId);

// Ruta para obtener todos los cobros por ID de usuario
router.get('/alldata/:id', getAllCobrosDataByUserId);

// Ruta para actualizar la tabla de cobro
router.put('/actualizarCobro/:id', updateCobro);

// Ruta para actualizar un cobro factura de venta
router.put('/actualizarCobroFV/:id', updateCobroFV);

// Ruta para actualizar un cobro factura de venta excenta
router.put('/actualizarCobroFVE/:id', updateCobroFV);

// Ruta para actualizar un cobro de nota de credito
router.put('/actualizarCobroNC/:id', updateCobroNC);

// Ruta para eliminar un cobro de factura de venta en ambas tablas
router.delete('/eliminarFV/:id', deleteCobroFV);

// Ruta para eliminar un cobro de factura de venta excenta en ambas tablas
router.delete('/eliminarFVE/:id', deleteCobroFVE);

// Ruta para eliminar un cobro de factura de venta en ambas tablas
router.delete('/eliminarNC/:id', deleteCobroNC);

export default router

