import { Router } from 'express';
import { createPuntoDespacho, getPuntoDespachoByClienteId,updatePuntoDespacho,deletePuntoDespacho } from '../../controllers/comercial/puntoDespachoClienteController.js';



const router = Router();

// Crear un punto de despacho

router.post('/puntoDes', createPuntoDespacho);

// Buscar un punto de despacho

router.get('/puntoDes/:idCliente', getPuntoDespachoByClienteId);

// Actualizar un punto de despacho

router.put('/puntoDes/:id', updatePuntoDespacho);

// Eliminar un punto de despacho

router.delete('/puntoDes/:id', deletePuntoDespacho);

export default router