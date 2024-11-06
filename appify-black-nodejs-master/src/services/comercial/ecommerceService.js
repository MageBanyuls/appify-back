import EcommerceRepository from "../../persistence/repositorys/comercial/ecommerceRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
class EcommerceService {
    async createEcommerce(data) {
        try {
            const superUserExist = await userRepository.userExistsById(data.user);
            const ecommerceExist = await EcommerceRepository.ecommerceExistsByName(data.nombre);
            if(ecommerceExist && superUserExist){
                throw new CustomError(400, "Bad Request", 'El nombre del E-commerce ya existe!')
            }
            return  EcommerceRepository.createEcommerce({ ...data });
        } catch (error) {
            throw error
        }
    }
    async getEcommerceById(id) {
        try {
            return EcommerceRepository.findEcommerceById(id);
        } catch (error) {
            throw error
        }
    }
    async getEcommerceByCategory(userId, nameEcommerce) {
        try {
            return EcommerceRepository.findAllEcommerceByCategory(userId, nameEcommerce);
        } catch (error) {
            throw error
        }
    }
    async getEcommerceByUserId(userId) {
        try {
            return EcommerceRepository.findAllEcommerceByUserId(userId);
        } catch (error) {
            throw error
        }
    }
    async updateEcommerce(id, updateData) {
        try {
            return EcommerceRepository.updateEcommerce(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteEcommerce(id) {
        try {
            return EcommerceRepository.deleteEcommerce(id);
        } catch (error) {
            throw error
        }
    }
}
export default new EcommerceService();