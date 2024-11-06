import { Router } from 'express';
import { createCosto, getCostosByProyectoId,updateCosto,deleteCosto } from '../../controllers/comercial/costosProyectoController.js';



const router = Router();

// Crear un costo de proyecto

router.post('/costosProyecto', createCosto);

// Buscar costos de proyecto

router.get('/costosProyecto/:idProyecto', getCostosByProyectoId);

// Actualizar un contacto

router.put('/costosProyecto/:id', updateCosto);

// Eliminar un contacto

router.delete('/costosProyecto/:id', deleteCosto);

export default router