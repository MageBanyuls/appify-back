import cuentasRepository from "../../persistence/repositorys/administracion/cuentasRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class cuentasService {
    async createCuentasBanco(data) {
        try {
            const id = idgenerate("Cuenta-banco");
            return  cuentasRepository.createCuentaBanco({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async createCuentaBancoConciliacion(data) {
        try {
            const id = idgenerate("Cuenta-banco-conciliacion");
            return  cuentasRepository.createCuentaBancoConciliacion({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async createCategoriaCuenta(data) {
        try {
            const id = idgenerate("Categoria-cuenta");
            return  cuentasRepository.createCategoriaCuenta({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async createCuentaTipoDocumento(data) {
        try {
            const id = idgenerate("Cuenta-tipo-doc");
            return  cuentasRepository.createCuentaTipoDocumento({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async createBanco(data) {
        try {
            const id = idgenerate("Banco");
            return  cuentasRepository.createBanco({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async createCondicionPago(data) {
        try{
            const id = idgenerate("Condicion-pago");
            const idCPago = idgenerate("Condiciones-Pago")
            const {condicion_pago, condiciones_condicion_pago} = data;
            const CondicionPago = await cuentasRepository.createCondicionPago({ ...condicion_pago, id: id });
            const CondicionesCondicionPago = await cuentasRepository.createCondicionesCondicionPago({ ...condiciones_condicion_pago, id: idCPago, idCondicion : id });
            return [CondicionPago, CondicionesCondicionPago];
        } catch (error) {
            throw error;
        }
    }
    async getCuentaBancoById(id) {
        try {
            return cuentasRepository.findCuentaBancoById(id);
        } catch (error) {
            throw error;
        }
    }
    async getCuentaBancoConciliacionId(id) {
        try {
            return cuentasRepository.findCuentaBancoConciliacionById(id);
        } catch (error) {
            throw error
        }
    }
    async getCategoriaCuentaById(id) {
        try {
            return cuentasRepository.findCategoriaCuentaById(id);
        } catch (error) {
            throw error
        }
    }
    async getCuentaTipodocumentoById(id) {
        try {
            return cuentasRepository.findCuentaTipodocumentoById(id);
        } catch (error) {
            throw error
        }
    }
    async getCondicionPagoById(id) {
        try {
            return cuentasRepository.findCondicionPagoById(id);
        } catch (error) {
            throw error
        }
    }
    async getCondicionesCondicionPagoById(id) {
        try {
            return cuentasRepository.findCondicionesCondicionPagoById(id);
        } catch (error) {
            throw error
        }
    }
    async getCondicionAndCondicionesByCondicionId(id) {
        try {
            const condicion = await this.getCondicionPagoById(id);
            const condiciones = await this.getCondicionesCondicionPagoById(condicion.id)
            return [condicion, condiciones];
        } catch (error) {
            throw error
        }
    }
    async getAllCuentasBancoByUserId(id) {
        try {
            return cuentasRepository.findAllCuentasBancoByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async getAllCuentasBancoConciliacionByUserId(id) {
        try {
            return cuentasRepository.findAllCuentasBancoConciliacionByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async getAllCategoriasCuentaByUserId(id) {
        try {
            return cuentasRepository.findAllCategoriasCuentaByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async getAllCuentasTipoDocumentoByUserId(id) {
        try {
            return cuentasRepository.findAllCuentaTipoDocumentoByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async getAllBancosByUserId(id) {
        try {
            return cuentasRepository.findAllBancosByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async getAllCondicionPagoByUserId(id) {
        try {
            return cuentasRepository.findAllCondicionPagoByUserId(id);
        } catch (error) {
            throw error
        }
    }
    async updateCuentasBanco(id, updateData) {
        try {
            return cuentasRepository.updateCuentasBanco(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCategoriaCuenta(id, updateData) {
        try {
            return cuentasRepository.updateCategoriaCuenta(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCuentaTipoDoc(id, updateData) {
        try {
            return cuentasRepository.updateCuentaTipoDoc(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateBanco(id, updateData) {
        try {
            return cuentasRepository.updateBanco(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCondicionPago(id, updateData) {
        try {
            return cuentasRepository.updateCondicionPago(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async updateCondicionesCondicionPago(id, updateData) {
        try {
            return cuentasRepository.updateCondicionesCondicionPago(id, updateData);
        } catch (error) {
            throw error
        }
    }
}
export default new cuentasService()