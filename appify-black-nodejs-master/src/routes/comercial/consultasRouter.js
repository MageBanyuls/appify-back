import { Router } from 'express';
import { 
    createConsulta,
    getConsultasByUserId,
    updateConsulta,
    deleteConsulta
} from '../../controllers/comercial/consultasController.js';
const router = Router();

// Crear un proyecto

router.post('/consulta', createConsulta);

// Buscar consultas

router.get('/consultas/:id', getConsultasByUserId);

// Actualizar una consulta

router.put('/consulta/:idConsulta', updateConsulta);


// Eliminar una consulta

router.delete('/consulta/:idConsulta', deleteConsulta);

export default router