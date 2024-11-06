import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
class ordenTrabajoRepository {
  async createOrdenTrabajo(data) {
    try {
      return prisma.orden_trabajo.create({
        data: data
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findOrdenTrabajoById(id) {
    try {
      return prisma.orden_trabajo.findUnique({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findOrdenTrabajoalldataById(id) {
    try {
      return prisma.orden_trabajo.findMany({
        where: { user: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findAllOrdenTrabajoByUserId(idUser) {
    const resultado = []; // Inicializamos un arreglo para almacenar los resultados
    try {
      const proyectos = await prisma.proyectos.findMany({
        where: {
          user: idUser, // Filtrar proyectos por el ID de usuario
        },
      });
      for (const proyecto of proyectos) {
        const ordenesDeTrabajo = await prisma.orden_trabajo.findMany({
          where: {
            idProyecto: proyecto.id,
          },
        });
        // Creamos un objeto que contenga la información del proyecto y sus órdenes de trabajo
        const OrdenesDeTrabajo = {
          ordenesDeTrabajo
        };
        // Agregamos el objeto al resultado
        resultado.push(OrdenesDeTrabajo);
      }
      return resultado;
    } catch (error) {
      return { error: 'Error al obtener los proyectos y sus ordenes de trabajo' }; // Manejo de error
    }
  }
  async updateOrdenTrabajo(id, updateData) {
    try {
      return prisma.orden_trabajo.update({
        where: { id: id },
        data: updateData
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async deleteOrdenTrabajo(id) {
    try {
      return prisma.orden_trabajo.delete({
        where: { id: id }
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new ordenTrabajoRepository();