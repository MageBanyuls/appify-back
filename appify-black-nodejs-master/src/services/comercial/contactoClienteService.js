import contactoClienteRepository from "../../persistence/repositorys/comercial/contactoClienteRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class contactoClienteService {
    async createContacto(data) {
        try {
            const id = idgenerate("contacto-cliente");
            return contactoClienteRepository.createContacto({ ...data, id: id });
        } catch (error) {
            throw error
        }
    }
    async getContactosByClienteId(clienteId) {
        try {
            return contactoClienteRepository.findAllContactosByClienteId(clienteId);
        } catch (error) {
            throw error
        }
    }
    async updateContacto(id, updateData) {
        try {
            return contactoClienteRepository.updateContacto(id, updateData);
        } catch (error) {
            throw error
        }
    }
    async deleteContacto(id) {
        try {
            return contactoClienteRepository.deleteContacto(id);
        } catch (error) {
            throw error
        }
    }
}
export default new contactoClienteService();