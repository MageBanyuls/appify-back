import { Router } from 'express';
import { 
    createPagosAll,
    getPagosAllById,
    getAllPagosByUserId,
    updatePago,
    updatePagoFC,
    updatePagoNC,
    deletePagoFC,
    deletePagoNC,
    getAllPagosDataByUserId
    
} from '../../controllers/administracion/pagosController.js';
const router = Router();

// Ruta para crear un pago cualquiera
router.post('/crear', createPagosAll);

// Ruta para obtener un pago cualquiera con su ID
router.get('/obtener/:id', getPagosAllById);

// Ruta para obtener todos los datos de pago por userId
router.get('/alldata/:id', getAllPagosDataByUserId);

// Ruta para obtener todos los pagos por ID de usuario
router.get('/todos/:id', getAllPagosByUserId);

// Ruta para actualizar la tabla de pago
router.put('/actualizarPago/:id', updatePago);

// Ruta para actualizar un pago factura de compra
router.put('/actualizarPagoFC/:id', updatePagoFC);

// Ruta para actualizar un pago nota de creditoa
router.put('/actualizarPagoNC/:id', updatePagoNC);

// Ruta para eliminar un cobro de factura de compra en ambas tablas
router.delete('/eliminarFC/:id', deletePagoFC);

// Ruta para eliminar un cobro de nota de credito en ambas tablas
router.delete('/eliminarNC/:id', deletePagoNC);


export default router

