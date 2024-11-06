import { Router } from 'express';
import { createContacto, getContactosByClienteId,updateContacto,deleteContacto } from '../../controllers/comercial/contactoClienteController.js';



const router = Router();

// Crear un item producto

router.post('/contacto', createContacto);

// Buscar contactos por cliente

router.get('/contacto/:idCliente', getContactosByClienteId);

// Actualizar un contacto

router.put('/contacto/:id', updateContacto);

// Eliminar un contacto

router.delete('/contacto/:id', deleteContacto);

export default router