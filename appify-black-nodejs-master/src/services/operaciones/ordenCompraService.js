import ordenCompraRepository from "../../persistence/repositorys/operaciones/ordenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import proveedorService from "../miempresa/proveedorService.js";
import itemProdServOrdenCompraService from "./itemProdServOrdenCompraService.js";
import { prisma } from "../../utils/dependencys/injection.js";
class ordenCompraService {
    async createOrdenCompra(data) {
        try {
            const id = idgenerate("orden-compra");
            return  ordenCompraRepository.createOrdenCompra({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }

    async createOCAll(data) {
        try {
            const {
                orden_compra,
                item_producto,
                item_servicio
            } = data;
            const ordencompra = await this.createOrdenCompra(orden_compra);
            let servicios = [], productos = [];
            
            if (Array.isArray(item_servicio)) {
                for (const item of item_servicio) {
                    servicios.push(await itemProdServOrdenCompraService.createServiceItem({...item, idOrdenCompra: ordencompra.id}));
                }
            } else if (item_servicio) {
                servicios.push(await itemProdServOrdenCompraService.createServiceItem({...item_servicio, idOrdenCompra: ordencompra.id}));
            }
            if (Array.isArray(item_producto)) {
                for (const item of item_producto) {
                    productos.push(await itemProdServOrdenCompraService.createitemProducto({...item, idOrdenCompra: ordencompra.id}));
                }
            } else if (item_producto) {
                productos.push(await itemProdServOrdenCompraService.createitemProducto({...item_producto, idOrdenCompra: ordencompra.id}));
            }
            return {
                ordencompra,
                servicios,
                productos
            };
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraById(id) {
        try {
            return ordenCompraRepository.findOrdenCompraById(id);
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraByUserId(userId) {
        try {
            return ordenCompraRepository.findOrdenCompraallByuserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAllDataOrdenCompraByUserId(id) {
        try {
            const ordenes = await this.getOrdenCompraByUserId(id);
            const formattedOrdenes = [];
    
            for (const orden of ordenes) {
                const proveedor = await proveedorService.getProveedorById(orden.idProvedor);
                const itemproducto = await prisma.item_producto.findMany({
                    where: {
                        idOrdenCompra: orden.id
                    }
                });
    
                
                for (const item of itemproducto) {
                    const producto = await prisma.productos.findUnique({
                        where: {
                            id: item.idProducto
                        }
                    });
                    item.nombre = producto.nombre;
                }
    
                const itemservicio = await prisma.item_servicios.findMany({
                    where: {
                        idOrdenCompra: orden.id
                    }
                });
    
                
                for (const item of itemservicio) {
                    const servicio = await prisma.servicios.findUnique({
                        where: {
                            id: item.idServicio
                        }
                    });
                    item.nombre = servicio.nombre;
                }
    
                formattedOrdenes.push({ orden: orden, proveedor: proveedor.razon_social, productos: itemproducto, servicios: itemservicio })
            }
    
            return formattedOrdenes;
        } catch (error) {
            throw error;
        }
    }
    
    async updateOrdenCompra(id, updateData) {
        try {
            return ordenCompraRepository.updateOrdenCompra(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteOrdenCompra(id) {
        try {
            return ordenCompraRepository.deleteOrdenCompra(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ordenCompraService();