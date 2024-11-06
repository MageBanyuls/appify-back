import ProjectRepository from "../../persistence/repositorys/comercial/ProjectRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import projectPrestacionService from "../../services/comercial/projectPrestacionService.js";
import projectAgendamientoService from "../../services/comercial/projectAgendamientoService.js";
import itemsProdServProjectService from "../../services/comercial/itemsProdServProyectosService.js";
import clientesService from "../../services/comercial/clientesService.js";
import userService from "../miempresa/userService.js";
import ProductService from "../miempresa/ProductService.js";
import ServiceService from "../miempresa/ServiceService.js";
import puntoDespachoClienteService from "./puntoDespachoClienteService.js";
import contactoClienteService from "./contactoClienteService.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
class ProjectService {
    async createProject(data) {
        try {
            const id = idgenerate("project");
            //Verificar si existe el proyecto y el usuario para la empresa
            const superUserExist = await userRepository.userExistsById(data.user);
            const proyectoExist = await ProjectRepository.projectExistsByName(data.nombre_etiqueta, data.user);
            if(proyectoExist && superUserExist){
                throw new CustomError(400, "Bad Request",'Proyecto ya existente en la empresa')
            }
            return ProjectRepository.createProject({ ...data, id: id });
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async createProjectAll(data) {
        try {
            const {
                proyectos,
                direccion_de_prestacion_proyecto,
                agendamiento_proyecto,
                item_servicio_proyecto,
                item_producto_proyecto
            } = data;
            const proyecto = await this.createProject(proyectos);
            let direccion, agendamiento, servicios = [], productos = [];
            if (direccion_de_prestacion_proyecto) {
                direccion = await projectPrestacionService.createProjectPrestacion({...direccion_de_prestacion_proyecto, proyecto: proyecto.id});
            }
            if (agendamiento_proyecto) {
                agendamiento = await projectAgendamientoService.createProjectAgendamiento({...agendamiento_proyecto, proyecto: proyecto.id});
            }
            if (Array.isArray(item_servicio_proyecto)) {
                for (const item of item_servicio_proyecto) {
                    servicios.push(await itemsProdServProjectService.createServiceItem({...item, idProyecto: proyecto.id}));
                }
            } else if (item_servicio_proyecto) {
                servicios.push(await itemsProdServProjectService.createServiceItem({...item_servicio_proyecto, idProyecto: proyecto.id}));
            }
            if (Array.isArray(item_producto_proyecto)) {
                for (const item of item_producto_proyecto) {
                    productos.push(await itemsProdServProjectService.createItemProductProject({...item, idProyecto: proyecto.id}));
                }
            } else if (item_producto_proyecto) {
                productos.push(await itemsProdServProjectService.createItemProductProject({...item_producto_proyecto, idProyecto: proyecto.id}));
            }
            return {
                proyecto,
                direccion,
                agendamiento,
                servicios,
                productos
            };
        } catch (error) {
            throw error;
        }
    }
    async getProjectById(id) {
        try {

            const formattedProjectito = [];

            const project = await ProjectRepository.findProjectById(id);
            const cliente = await clientesService.getClienteById(project.cliente)
            const vendedor = await userService.getSubUserById(project.vendedor)
            const itemproductos = await itemsProdServProjectService.getProductsItemByprojectId(project.id)
            const itemservicios = await itemsProdServProjectService.getServiceItemByProjectId(project.id)
            const ordenTrabajo = await clientesRepository.findOTByProjectId(id);
            //const contactos = await contactoClienteService.getContactosByClienteId(project.cliente)
                

            //const puntosDespacho = await puntoDespachoClienteService.getPuntoDespachoByClienteId(project.cliente)
            // Obtener los nombres de los productos
            const productos = await Promise.all(itemproductos.map(async (itemProducto) => {
                const producto = await ProductService.getProductById(itemProducto.idProducto);
                return {
                    ...itemProducto,
                    nombre: producto.nombre
                };
            }));
            // Obtener los nombres de los servicios
            const servicios = await Promise.all(itemservicios.map(async (itemServicio) => {
                const servicio = await ServiceService.getServiceById(itemServicio.idServicio);
                return {
                    ...itemServicio,
                    nombre: servicio.nombre
                };
            }));
            // Calcular la suma de los netos de los productos
            const netoProductos = productos.reduce((total, product) => total + product.precio, 0);
            // Calcular la suma de los netos de los servicios
            const netoServicios = servicios.reduce((total, service) => total + service.precio, 0);
            // Calcular la suma de los totales de los productos
            const totalProductos = productos.reduce((total, product) => total + product.total, 0);
            // Calcular la suma de los totales de los servicios
            const totalServicios = servicios.reduce((total, service) => total + service.total, 0);
            const formattedProject = {
                id: project.id,
                numero: project.numero_proyecto,
                nombre: project.nombre_etiqueta,
                estado: project.estado,
                fecha: project.fecha,
                comision: project.comision,
                condicion_pago:project.condicion_de_pago,
                plazo_de_entrega: project.plazo_de_entrega,
                plazo_de_entrega_dias: project.plazo_de_entrega_dias,
                orden_trabajo: ordenTrabajo,
                //contacto: contactos,
                cliente: cliente,
                vendedor:`${vendedor.nombre},${vendedor.apellido}`,
                idVendedor:vendedor.id,
                productos_servicios: {
                    productos: productos,
                    servicios: servicios
                },
                //puntodespacho: puntosDespacho,
                neto: netoProductos + netoServicios,
                total: totalProductos + totalServicios
            };
                formattedProjectito.push(formattedProject);

        return formattedProjectito;

        } catch (error) {
            throw error;
        }
    }
    async getProjectsByUserId(userId) {
        try {
            return ProjectRepository.findAllProjectsByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async getAllDataProjects(userId){
        try {
            const projects = await this.getProjectsByUserId(userId);
            const formattedProjects = [];
            for (const project of projects) {
                const cliente = await clientesService.getClienteById(project.cliente)
                console.log(cliente)
                const vendedor = await userService.getSubUserById(project.vendedor)
                const itemproductos = await itemsProdServProjectService.getProductsItemByprojectId(project.id)
                const itemservicios = await itemsProdServProjectService.getServiceItemByProjectId(project.id)
                // Obtener los nombres de los productos
                const productos = await Promise.all(itemproductos.map(async (itemProducto) => {
                    const producto = await ProductService.getProductById(itemProducto.idProducto);
                    return {
                        ...itemProducto,
                        nombre: producto.nombre
                    };
                }));
                // Obtener los nombres de los servicios
                const servicios = await Promise.all(itemservicios.map(async (itemServicio) => {
                    const servicio = await ServiceService.getServiceById(itemServicio.idServicio);
                    return {
                        ...itemServicio,
                        nombre: servicio.nombre
                    };
                }));
                // Calcular la suma de los netos de los productos
                const netoProductos = productos.reduce((total, product) => total + product.precio, 0);
                // Calcular la suma de los netos de los servicios
                const netoServicios = servicios.reduce((total, service) => total + service.precio, 0);
                // Calcular la suma de los totales de los productos
                const totalProductos = productos.reduce((total, product) => total + product.total, 0);
                // Calcular la suma de los totales de los servicios
                const totalServicios = servicios.reduce((total, service) => total + service.total, 0);
                const formattedProject = {
                    id: project.id,
                    numero: project.numero_proyecto,
                    nombre: project.nombre_etiqueta,
                    estado: project.estado,
                    fecha: project.fecha,
                    cliente: cliente.cliente.razon_social,
                    vendedor:`${vendedor.nombre},${vendedor.apellido}`,
                    productos_servicios: {
                        productos: productos,
                        servicios: servicios
                    },
                    neto: netoProductos + netoServicios,
                    total: totalProductos + totalServicios
                };
                    formattedProjects.push(formattedProject);
            }
        return formattedProjects;
        } catch (error) {
            throw error;
        }
    }
    async updateProject(id, updateData) {
        try {
            return ProjectRepository.updateProject(id, updateData);
        } catch (error) {
            throw error;
        }
    }


    async deleteProject(id) {
        try {
            return ProjectRepository.deleteProject(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ProjectService();