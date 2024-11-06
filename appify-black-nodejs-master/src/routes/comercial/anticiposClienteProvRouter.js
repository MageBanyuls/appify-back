import { Router } from 'express';
import { createAnticipoCliente, createAnticipoProveedor, getAnticiposClienteByProyectoId,getAnticiposProveedorByProyectoId,updateAnticipoCliente,updateAnticipoProveedor,deleteAnticipoCliente,deleteAnticipoProveedor } from '../../controllers/comercial/anticiposClienteProvController.js';



const router = Router();

// Crear un anticipo de cliente

router.post('/anticiposCliente', createAnticipoCliente);

// Buscar anticipos de cliente de un proyecto

router.get('/anticiposCliente/:idProyecto', getAnticiposClienteByProyectoId);

// Actualizar un anticipo de cliente

router.put('/anticiposCliente/:id', updateAnticipoCliente);

// Eliminar un anticipo de cliente

router.delete('/anticiposCliente/:id', deleteAnticipoCliente);

// Crear un anticipo de proveedor

router.post('/anticiposProveedor', createAnticipoProveedor);

// Buscar anticipos de proveedor de un proyecto

router.get('/anticiposProveedor/:idProyecto', getAnticiposProveedorByProyectoId);

// Actualizar un anticipo de proveedor

router.put('/anticiposProveedor/:id', updateAnticipoProveedor);

// Eliminar un anticipo de proveedor

router.delete('/anticiposProveedor/:id', deleteAnticipoProveedor);

export default router