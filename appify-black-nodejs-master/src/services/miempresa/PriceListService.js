import PriceListRepository from "../../persistence/repositorys/miempresa/PriceListRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class PriceListService {
    async getPriceListsByUserId(userId) {
        try {
            return await PriceListRepository.findAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async getPriceListByIdAndUserId(id, userId) {
        try {
            return await PriceListRepository.findByIdAndUserId(id, userId);
        } catch (error) {
            throw error;
        }
    }
    async createPriceList(user, nombre, iva) {
        try {
            const id = idgenerate("price-list");
            await PriceListRepository.createPriceList({ id, user, nombre, iva });
            return { ok: true, message: 'Lista de precios creada exitosamente.' };
        } catch (error) {
            throw error;
        }
    }
    async updatePriceList(id, userId, updateFields) {
        try {
            const existingList = await this.getPriceListByIdAndUserId(id, userId);
            if (!existingList) {
            throw new CustomError(404, "Not Found",'Lista de precios no encontrada');
            }
            await PriceListRepository.updatePriceList(id, updateFields);
            return { success: true, message: 'Lista de precios actualizada correctamente' };
        } catch (error) {
            throw error;
        }
    }
    async deletePriceList(id, userId) {
        try {
            const existingList = await this.getPriceListByIdAndUserId(id, userId);
            if (!existingList) {
                throw new CustomError(404, "Not Found",'Lista de precios no encontrada');
            }
            await PriceListRepository.deletePriceList(id);
            return { success: true, message: 'Lista de precios eliminada correctamente' };
        } catch (error) {
            throw error;
        }
    }
}
export default new PriceListService();