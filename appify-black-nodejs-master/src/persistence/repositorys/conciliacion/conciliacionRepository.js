import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
class conciliacionRepository {
  async createLink(data) {
    try {
      return prisma.link_fintoc_bancos.create({
        data: data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async createCuentaBancaria(data) {
    try {
      return prisma.cuentasBancarias.create({
        data: data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async createCuentaBancariaLinkConciliacion(data) {
    try {
      return prisma.cuenta_banco_conciliacion.create({
        data: data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async insertarMovimiento(movimiento) {
    try {
      // Verificar si el movimiento ya existe en la base de datos
      const existingMovimiento = await prisma.movimientos_cuenta.findUnique({
        where: {
          id: movimiento.id,
        },
      });
      // Si el movimiento no existe en la base de datos, procede a insertarlo
      if (!existingMovimiento) {
        const data = {
          id: movimiento.id,
          cuenta_id: movimiento.cuenta_id,
          description: movimiento.description || null,
          amount: movimiento.amount,
          currency: movimiento.currency,
          post_date: movimiento.post_date,
          transaction_date: movimiento.transaction_date || null,
          type: movimiento.type,
          sender_account_holder_id:
            movimiento.sender_account?.holder_id || null,
          sender_account_number: movimiento.sender_account?.number || null,
          sender_account_institution_id:
            movimiento.sender_account?.institution?.id || null,
          sender_account_institution_name:
            movimiento.sender_account?.institution?.name || null,
          sender_account_institution_country:
            movimiento.sender_account?.institution?.country || null,
          sender_account_name: movimiento.sender_account?.holder_name || null,
          recipient_account_holder_id:
            movimiento.recipient_account?.holder_id || null,
          recipient_account_number:
            movimiento.recipient_account?.number || null,
          recipient_account_institution_id:
            movimiento.recipient_account?.institution?.id || null,
          recipient_account_institution_name:
            movimiento.recipient_account?.institution?.name || null,
          recipient_account_institution_country:
            movimiento.recipient_account?.institution?.country || null,
          recipient_account_name:
            movimiento.recipient_account?.holder_name || null,
          comment: movimiento.comment || null,
          reference_id: movimiento.reference_id || null,
          pending: movimiento.pending,
        };
        await prisma.movimientos_cuenta.create({
          data: data,
        });
      } else {
        return `Movimiento con ID ${movimiento.id} ya existe en la base de datos. Omitiendo inserción.`;
      }
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async createMovimientos(data) {
    // Si el dato recibido es un objeto iterable (como una lista)
    if (Symbol.iterator in Object(data)) {
      // Iterar sobre cada movimiento en la lista
      for (const movimiento of data) {
        await this.insertarMovimiento(movimiento);
      }
    } else {
      // Si el dato recibido no es iterable, asumimos que es un solo movimiento
      await this.insertarMovimiento(data);
    }
  }
  async findLinkByUserId(userid) {
    try {
      return prisma.link_fintoc_bancos.findUnique({
        where: { user: userid },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async deleteCuentasByCuentaId(id) {
    try {
      const result = [];

      // Eliminar enlaces asociados
      const deletedLinkFintocBancos = await prisma.link_fintoc_bancos.delete({
        where: { id: id },
      });

      // Buscar cuentas bancarias asociadas a la conciliación
      const cuentas = await this.findCuentasBancariasByConciliacionId(id);

      // Eliminar cuentas bancarias individualmente
      for (const cuenta of cuentas) {
        const deletedCuentaBancaria = await prisma.cuentasBancarias.delete({
          where: { id: cuenta.id },
        });
        result.push(deletedCuentaBancaria);
      }

      // Agregar resultados al array result
      result.push(deletedLinkFintocBancos);

      // Retornar el array result
      console.log("result deleteCuentasByCuentaId ", result);
      return result;
    } catch (error) {
      console.log(error);
      handlePrismaError(error);
      // Si ocurre un error, podrías lanzarlo nuevamente para que se maneje en niveles superiores
      throw error;
    }
  }

  async findLinkCuentasBancoConciliacionByCuentaId(id) {
    try {
      return prisma.cuenta_banco_conciliacion.findFirst({
        where: { idCuentaBanco: id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findCuentasByCuentaId(cuentaId) {
    try {
      return prisma.cuentasBancarias.findUnique({
        where: { cuenta_id: cuentaId },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findMovimientosById(id) {
    try {
      return prisma.movimientos_cuenta.findUnique({
        where: { id: id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findConciliacionesByUserId(userId) {
    try {
      return prisma.link_fintoc_bancos.findMany({
        where: { user: userId },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findCuentasBancariasByConciliacionId(conciliacionId) {
    try {
      return prisma.cuentasBancarias.findMany({
        where: { conciliacion_id: conciliacionId },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async findMovimientosByCuentaId(cuentaId) {
    try {
      return prisma.movimientos_cuenta.findMany({
        where: { cuenta_id: cuentaId },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async updateUserConciliacion(id, updateData) {
    try {
      return prisma.link_fintoc_bancos.update({
        where: { id: id },
        data: updateData,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
  async updateCuentaBancariaById(id, updateData) {
    try {
      return prisma.cuentasBancarias.update({
        where: { cuenta_id: id },
        data: updateData,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new conciliacionRepository();
