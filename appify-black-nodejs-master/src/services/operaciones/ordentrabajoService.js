import clientesRepository from "../../persistence/repositorys/comercial/clientesRepository.js";
import ordenTrabajoRepository from "../../persistence/repositorys/operaciones/ordentrabajoRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import ProjectService from "../comercial/ProjectService.js";
import userService from "../miempresa/userService.js";
import itemsProdServProyectosService from "../comercial/itemsProdServProyectosService.js";
import ProductService from "../miempresa/ProductService.js";
import ServiceService from "../miempresa/ServiceService.js";
class ordenTrabajoService {
    async createOrdenTrabajo(data) {
        try {
            const id = idgenerate("orden-trabajo");
            return  ordenTrabajoRepository.createOrdenTrabajo({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getOrdenTrabajoById(id) {
        try {
            return ordenTrabajoRepository.findOrdenTrabajoById(id);
        } catch (error) {
            throw error;
        }
    }
    async getOrdenTrabajoByUserId(userId) {
        try {
            return ordenTrabajoRepository.findOrdenTrabajoalldataById(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAllDataOrdenTrabajoByUserId(id) {
        try{
            const ordenes = await this.getOrdenTrabajoByUserId(id);

            const formattedOrdenes = [];

            for (const orden of ordenes) {
                
                const project = await ProjectService.getProjectById(orden.idProyecto)
                const cliente = await clientesRepository.findClienteById(project[0].cliente.cliente.id)
                const vendedor = await userService.getSubUserById(orden.idVendedor)
                const itemproductos = await itemsProdServProyectosService.getProductsItemByprojectId(project[0].id)
                const itemservicios = await itemsProdServProyectosService.getServiceItemByProjectId(project[0].id)

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
                    orden: orden.id,
                    idProyecto: project.id,
                    numero: project[0].numero_proyecto,
                    nombre: project[0].nombre_etiqueta,
                    estado: orden.estado,
                    compromiso : orden.compromiso,
                    fechaOrden: orden.fecha,
                    cliente: cliente.razon_social,
                    vendedor:`${vendedor.nombre},${vendedor.apellido}`,
                    idVendedor: vendedor.id,
                    productos_servicios: {
                        productos: productos,
                        servicios: servicios
                    },
                    neto: netoProductos + netoServicios,
                    total: totalProductos + totalServicios
                };
                    formattedOrdenes.push(formattedProject);
            }

        return formattedOrdenes;
            

        }catch (error){
            console.log(error)
            throw error;

        }
    }
    async updateOrdenTrabajo(id, updateData) {
        try {
            return ordenTrabajoRepository.updateOrdenTrabajo(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteOrdenTrabajo(id) {
        try {
            return ordenTrabajoRepository.deleteOrdenTrabajo(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ordenTrabajoService();