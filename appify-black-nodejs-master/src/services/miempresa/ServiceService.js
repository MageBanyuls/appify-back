import ServiceRepository from "../../persistence/repositorys/miempresa/serviceRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ServiceService {
    async createService(data) {
        try {
            const id = idgenerate("service");
            const superUserExist = await userRepository.userExistsById(data.user);
            const serviceExist = await ServiceRepository.serviceExistsByName(data.nombre, data.user);
            if(serviceExist && superUserExist){
                throw new CustomError(400, "Bad Request", 'Servicio ya existente en la empresa')
            }
            return  ServiceRepository.createService({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getServiceById(id) {
        try {
            return ServiceRepository.findServiceById(id);
        } catch (error) {
            throw error;
        }
    }
    async getServiceByUserId(userId) {
        try {
            return ServiceRepository.findAllServiciosByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async updateService(id, updateData) {
        try {
            return ServiceRepository.updateServicios(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteService(id) {
        try {
            return ServiceRepository.deleteService(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ServiceService();