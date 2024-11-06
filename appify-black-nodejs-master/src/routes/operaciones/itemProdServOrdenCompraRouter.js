import { Router } from 'express';
import { 
    createitemProducto,
    getProductoById,
    getProdServByOrdenCompraId,
    updateItemProducto,
    deleteItemProducto,
    createitemServicio,
    getServicioById,
    updateItemServicios,
    deleteItemServicios
} from '../../controllers/operaciones/itemProdServOrdenCompraController.js';
const router = Router();

// Ruta para crear un item producto
router.post('/ordenCompraP', createitemProducto);

// Ruta para obtener un item producto con su ID
router.get('/ordenCompraP/:id', getProductoById);

// Ruta para obtener todas los item productos y servicios con el Id de la orden de compra
router.get('/h2/:idOrden', getProdServByOrdenCompraId);

// Ruta para actualizar un item producto
router.put('/ordenCompraP/:id', updateItemProducto);

// Ruta para actualizar un item Producto
router.delete('/ordenCompraP/:id', deleteItemProducto);

// Ruta para crear un item producto
router.post('/ordenCompraS', createitemServicio);

// Ruta para obtener un item producto con su ID
router.get('/ordenCompraS/:id', getServicioById);

// Ruta para actualizar un item producto
router.put('/ordenCompraS/:id', updateItemServicios);

// Ruta para actualizar un item Producto
router.delete('/ordenCompraS/:id', deleteItemServicios);


export default router