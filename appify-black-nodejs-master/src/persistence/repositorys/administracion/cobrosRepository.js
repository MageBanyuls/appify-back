import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
class cobrosRepository {
    async createCobros(data) {
        // Verificar si se proporciona un objeto de datos
        if (!data) {
            throw new CustomError(400,"Bad request", "Datos faltantes");
        }
        try {
            // Crear un nuevo cobro utilizando Prisma
            const nuevoCobro = await prisma.cobros.create({
                data: data
            });
            // Devolver el nuevo cobro creado
            return nuevoCobro;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createCobrosFV(data) {
        // Verificar si se proporciona un objeto de datos
        if (!data) {
            throw new CustomError(400,"Bad request", "Datos faltantes");
        }
        try {
            // Crear un nuevo cobro utilizando Prisma
            const nuevoCobroFV = await prisma.cobros_factura_venta.create({
                data: data
            });
            // Devolver el nuevo cobro creado
            return nuevoCobroFV;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createCobrosFVE(data) {
        // Verificar si se proporciona un objeto de datos
        if (!data) {
            throw new CustomError(400, "Bad Request", "Datos faltantes");
        }
        try {
            // Crear un nuevo cobro utilizando Prisma
            const nuevoCobroFVE = await prisma.cobros_factura_venta_excenta.create({
                data: data
            });
            // Devolver el nuevo cobro creado
            return nuevoCobroFVE;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async createCobrosNC(data) {
        // Verificar si se proporciona un objeto de datos
        if (!data) {
            throw new CustomError(400, "Bad Request", "Datos faltantes");
        }
        try {
            // Crear un nuevo cobro utilizando Prisma
            const nuevoCobroNC = await prisma.cobros_factura_nota_credito.create({
                data: data
            });
            // Devolver el nuevo cobro creado
            return nuevoCobroNC;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findCobroById(id) {
        try {
            return prisma.cobros.findUnique({
                where: { id: id }
            });
        }catch (error){
            handlePrismaError(error);
        }
    }
    async findCobroFVByCobroId(id) {
        try {
            return prisma.cobros_factura_venta.findFirst({
                where: { idCobro: id }
            });
        }catch (error) {
            handlePrismaError(error);
        }
    }
    async findCobroFVEByCobroId(id) {
        try {
            return prisma.cobros_factura_venta_excenta.findFirst({
                where: { idCobro: id }
            });
        } catch(error) {
            handlePrismaError(error)
        }
    }
    async findNCById(id){
        try {
            return prisma.notas_de_credito_debito.findUnique({
                where : { id : id }
            });
        }  catch(error) {
            handlePrismaError(error);
        }
    }
    async findFVById(id){
        try {
            return prisma.factura_venta.findUnique({
                where : { id : id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async findFVEById(id){
        try {
            return prisma.factura_venta_excenta.findUnique({
                where : { id : id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async findFVNCById(id){
        try {
            return prisma.notas_de_credito_debito.findUnique({
                where : { id : id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async findCobroNCByCobroId(id) {
        try {
            return prisma.cobros_factura_nota_credito.findFirst({
                where: { idCobro: id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async findAllCobrosByUserId(userId) {
        try{
            return prisma.cobros.findMany({
                where: { user: userId }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async updateCobro(id, updateData) {
        try {
            return prisma.cobros.update({
                where: { id: id },
                data: updateData
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async updateCobroFV(id, updateData) {
        try {
            return prisma.cobros_factura_venta.update({
                where: { id: id },
                data: updateData
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async updateCobroFVE(id, updateData) {
        try {
            return prisma.cobros_factura_venta_excenta.update({
                where: { id: id },
                data: updateData
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async updateCobroNC(id, updateData) {
        try{
            return prisma.cobros_factura_nota_credito.update({
                where: { id: id },
                data: updateData
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async deleteCobro(id) {
        try{
            return prisma.cobros.delete({
                where: { id: id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async deleteCobroFVByCobroId(id) {
        try{
            return prisma.cobros_factura_venta.delete({
                where: { id: id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async deleteCobroFVEByCobroId(id) {
        try{
            return prisma.cobros_factura_venta_excenta.delete({
                where: { id: id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
    async deleteCobroNCByCobroId(id) {
        try{
            return prisma.cobros_factura_nota_credito.delete({
                where: { id: id }
            });
        } catch(error) {
            handlePrismaError(error);
        }
    }
}
export default new cobrosRepository()