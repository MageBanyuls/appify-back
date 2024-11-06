import { Router } from 'express';
import { 
    createItemProductProject,
    getProductItemById,
    getProductsItemByprojectId,
    updateProductItem,
    deleteProductItem,
    createServiceItem,
    getServiceItemById,
    getServiceItemByProjectId,
    updateServiceItem,
    deleteServiceItem

} from '../../controllers/comercial/itemProdServProyectoController.js';



const router = Router();

// Crear un item producto

router.post('/project/item/prod', createItemProductProject);

// Buscar un item producto con su id

router.get('/project/item/prod/:idProyecto', getProductItemById);

// Buscar item productos

router.get('/projects/item/prod/:id', getProductsItemByprojectId);

// Actualizar un item producto

router.put('/project/item/prod/:idProyecto', updateProductItem);

// Eliminar un item producto

router.delete('/project/item/prod/:idProyecto', deleteProductItem);

// Crear un item servicio

router.post('/project/item/serv', createServiceItem);

// Buscar un item servicio

router.get('/project/item/serv/:id', getServiceItemById);

// Buscar item servicios

router.get('/projects/item/serv/:id', getServiceItemByProjectId);

// Actualizar un item servicio

router.put('/project/item/serv/:id', updateServiceItem);

// Eliminar un item servicio

router.delete('/project/item/serv/:idProyecto', deleteServiceItem);


export default router