import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
import itemProdServOrdenCompraRepository from "./itemProdServOrdenCompraRepository.js";
class ordenCompraRepository {
  async createOrdenCompra(data) {
    try {
      return prisma.orden_compra.create({
        data: data
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findOrdenCompraById(id) {
    try {
      return prisma.orden_compra.findUnique({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }


  async findOrdenCompraallByuserId(id) {
    try {
      return prisma.orden_compra.findMany({
        where: { user: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findProductosByProovedorId(id) {
    try {
      return prisma.proveedor_productos.findMany({
        where: { proveedor: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  



  async findAllOrdenCompraByUserId(idUser) {
    const resultado = []; // Inicializamos un arreglo para almacenar los resultados
    try {
      const proveedores = await prisma.proveedores.findMany({
        where: {
          user: idUser, // Filtrar proyectos por el ID de usuario
        },
      });
      for (const proveedor of proveedores) {
        const Proveedores = await prisma.orden_compra.findMany({
          where: {
            idProvedor: proveedor.id,
          },
        });
        const items = await itemProdServOrdenCompraRepository.findAllProdServByOrdenCompraId(Proveedores.id);
        // Creamos un objeto que contenga la información del proyecto y sus órdenes de trabajo
        const proovedtot = {
          proveedores,
          Proveedores,
          items

        };
        // Agregamos el objeto al resultado
        resultado.push(proovedtot);
      }
      return resultado;
    } catch (error) {
      return { error: 'Error al obtener los proveedores y sus ordenes de compra' }; // Manejo de error
    }
  }
  async updateOrdenCompra(id, updateData) {
    try {
      return prisma.orden_compra.update({
        where: { id: id },
        data: updateData
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async deleteOrdenCompra(id) {
    try {
      return prisma.orden_compra.delete({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new ordenCompraRepository();