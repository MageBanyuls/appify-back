import { idgenerate } from "../../utils/id/idGenerate.js";
import conciliacionRepository from "../../persistence/repositorys/conciliacion/conciliacionRepository.js";

import { CustomError } from "../../utils/httpRes/handlerResponse.js";

class conciliacionService {
  async saveBankData(jsonData) {
    try {
      const { data } = jsonData;
      const username = idgenerate("temp-user");
      const { id: link_id_banco, holder_id, link_token, accounts } = data;

      // Crear el registro en la tabla link_fintoc_bancos
      const linkData = {
        id: data.id,
        link_id_banco,
        link_token,
        holder_id,
        user: username, // Incluye el username aquí
      };
      await conciliacionRepository.createLink(linkData);

      if (Array.isArray(accounts)) {
        // Iterar sobre cada movimiento en la lista
        for (const account of accounts) {
          const cuentaData = {
            id: account.id,
            conciliacion_id: data.id,
            account_id: account.id,
            tipo: account.type,
            numero: account.number,
            nombre: account.name,
            saldo_disponible: account.balance.available,
            saldo_actual: account.balance.current,
            moneda: account.currency,
          };
          await conciliacionRepository.createCuentaBancaria(cuentaData);
        }
      } else {
        // Si solo hay una cuenta, crea el registro directamente
        const cuentaData = {
          id: accounts.id,
          conciliacion_id: data.id,
          account_id: accounts.id,
          tipo: accounts.type,
          numero: accounts.number,
          nombre: accounts.name,
          saldo_disponible: accounts.balance.available,
          saldo_actual: accounts.balance.current,
          moneda: accounts.currency,
        };
        await conciliacionRepository.createCuentaBancaria(cuentaData);
      }
    } catch (error) {
      throw new Error(
        "Error al guardar datos de bancos y cuentas bancarias:" + error
      );
    }
  }
  async createMovimientos(data) {
    try {
      return conciliacionRepository.createMovimientos(data);
    } catch (error) {
      throw new CustomError("400", error);
    }
  }

  async createCuentaLink(data) {
    try {
      const idCuentaLink = idgenerate("Cuenta-link");

      return conciliacionRepository.createCuentaBancariaLinkConciliacion({
        ...data,
        id: idCuentaLink,
      });
    } catch (error) {
      throw new CustomError("400", error);
    }
  }

  async getCuentaLinkById(id) {
    try {
      return conciliacionRepository.findLinkCuentasBancoConciliacionByCuentaId(
        id
      );
    } catch (error) {
      throw new CustomError("400", error);
    }
  }

  async getLinkByUserId(userId) {
    return conciliacionRepository.findLinkByUserId(userId);
  }

  async getLinkByUserId(userId) {
    return conciliacionRepository.findLinkByUserId(userId);
  }

  async unlinkCuentaBancariaById(id) {
    return conciliacionRepository.deleteCuentasByCuentaId(id);
  }

  async getMovimientosById(id) {
    return conciliacionRepository.findMovimientosById(id);
  }

  async getConciliacionesByUserId(userId) {
    return conciliacionRepository.findConciliacionesByUserId(userId);
  }

  async getCuentasBancariasByConciliacionId(conciliacionId) {
    return conciliacionRepository.findCuentasBancariasByConciliacionId(
      conciliacionId
    );
  }

  async getCuentasBancariasAllDataByUserId(userId) {
    try {
      const AllData = [];
      const conciliaciones =
        await conciliacionRepository.findConciliacionesByUserId(userId);

      for (const conciliacion of conciliaciones) {
        //console.log(conciliacion)

        const cuenta =
          await conciliacionRepository.findCuentasBancariasByConciliacionId(
            conciliacion.id
          );

        AllData.push({ conciliacion: conciliacion, cuentas: cuenta });
      }
      if (AllData.length === 0) {
        throw new CustomError(404, "No se encontraron datos");
      }
      return AllData;
    } catch (error) {
      throw error;
    }
  }

  async getMovimientosByCuentaId(cuentaId) {
    return conciliacionRepository.findMovimientosByCuentaId(cuentaId);
  }

  async updateUserConciliacion(id, user) {
    const updateData = { user };
    return conciliacionRepository.updateUserConciliacion(id, updateData);
  }

  async updateCuentaBancariaById(id, accId) {
    const updateData = { activo: accId };
    return conciliacionRepository.updateCuentaBancariaById(id, updateData);
  }
}

export default new conciliacionService();
