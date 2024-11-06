import { Router } from 'express';
import { 
    getProjectById,
    getProjectsByUserId,
    updateProject,
    deleteProject,
    createProjectAll,
    getAllDataProjectsbyUserId,

} from '../../controllers/comercial/ProjectsController.js';
import { 
    createProjectPrestacion,
    getProjectPrestacionById,
    updateProjectPrestacion,
    deleteProjectPrestacion
} from '../../controllers/comercial/projectPrestacionController.js';
import { 
    createProjectAgendamiento,
    getProjectAgendamientoById,
    updateProjectAgendamiento,
    deleteProjectAgendamiento
} from '../../controllers/comercial/projectAgendamientoController.js';


const router = Router();

/* Crear un proyecto con todas las variables posibles, el proyecto, agendamiento si tiene o no
si tiene direccion de prestacion o no, si tiene un producto o varios o no, si tiene un servicio o varios o no
*/

router.post('/crearProject', createProjectAll);

// Buscar un proyecto

router.get('/project/:idProyecto', getProjectById);

// Buscar proyectos

router.get('/projects/:id', getProjectsByUserId);

// Obtener todos los proyectos y data de proyectos por userid

router.get('/alldata/:id', getAllDataProjectsbyUserId);

// Actualizar un proyecto

router.put('/project/:idProyecto', updateProject);



// Eliminar un proyecto

router.delete('/project/:idProyecto', deleteProject);

// Crear una direccion de prestacion de proyecto

router.post('/projectp', createProjectPrestacion);

// Buscar una direccion de prestacion de proyecto

router.get('/projectp/:idProyecto', getProjectPrestacionById);

// Actualizar una direccion de prestacion de proyecto

router.put('/projectp/:idProyecto', updateProjectPrestacion);

// Eliminar una direccion de prestacion de proyecto

router.delete('/projectp/:idProyecto', deleteProjectPrestacion);


// Crear un agendamiento de proyecto

router.post('/projecta', createProjectAgendamiento);

// Buscar un agendamiento de proyecto

router.get('/projecta/:idProyecto', getProjectAgendamientoById);

// Actualizar un agendamiento de proyecto

router.put('/projecta/:idProyecto', updateProjectAgendamiento);

// Eliminar un agendamiento de proyecto

router.delete('/projecta/:idProyecto', deleteProjectAgendamiento);

export default router