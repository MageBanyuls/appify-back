import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class itemProdServOrdenCompraRepository {
  async createitemProducto(data) {
    try {
      return prisma.item_producto.create({
        data: data
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findItemProductoById(id) {
    try {
      return prisma.item_producto.findUnique({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async createitemServicio(data) {
    try {
      return prisma.item_servicios.create({
        data: data
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findItemServicioById(id) {
    try {
      return prisma.item_servicios.findUnique({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findAllProdServByOrdenCompraId(idOrden) {
    const resultado = []; 
    try {
      const ordencompra = await prisma.orden_compra.findUnique({
        where: {
          id : idOrden, // Filtrar proyectos por el ID de orden de compra
        },
      });
      if (ordencompra) {
        const productos = await prisma.item_producto.findMany({
          where: {
            idOrdenCompra: ordencompra.id,
          },
        });
        const servicios = await prisma.item_servicios.findMany({
          where: {
            idOrdenCompra: ordencompra.id,
          },
        });
        // Creamos un objeto que contenga la información del Producto y servicios de orden de
        const ProdServtot = {
          productos,
          servicios
        };
        // Agregamos el objeto al resultado
        resultado.push(ProdServtot);
      }else{
        throw new CustomError(404, 'No se encontró la orden de compra con el ID proporcionado')
      }
    // Retornamos el resultado como un objeto JSON
    return resultado;
    } catch (error) {
      handlePrismaError(error)
    }
  }
  async updateItemProducto(id, updateData) {
    try {
      return prisma.item_producto.update({
        where: { id: id },
        data: updateData
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async deleteItemProducto(id) {
    try {
      return prisma.item_producto.delete({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async updateItemServicios(id, updateData) {
    try {
      return prisma.item_servicios.update({
        where: { id: id },
        data: updateData
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async deleteItemServicios(id) {
    try {
      return prisma.item_servicios.delete({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new itemProdServOrdenCompraRepository();