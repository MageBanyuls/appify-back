import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProductsByUserId, updateProduct } from '../../controllers/miempresa/productController.js';

const router = Router();

// Crear producto 

router.post('/product', createProduct);

// Obtener un unico porducto por ID

router.get('/product/:idProducto', getProductById);

// Obtener todos los productos por usuario

router.get('/products/:id', getProductsByUserId);

// Actualizar un producto por ID

router.put('/product/:idProducto', updateProduct);

// Eliminar un producto por ID

router.delete('/product/:idProducto', deleteProduct);

export default router

