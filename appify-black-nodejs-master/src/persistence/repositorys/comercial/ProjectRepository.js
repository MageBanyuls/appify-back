import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class ProjectRepository{
    async createProject(data) {
        try {
            return prisma.proyectos.create({
                data: data
            });
        } catch (error) {
            console.log(error)
            handlePrismaError(error);
        }
    }
    async projectExistsByName(nameProject,user) {
        try {
            const nombre = await prisma.proyectos.findFirst({
                where: {
                    nombre_etiqueta : nameProject,
                    user : user
                },
            })
            return nombre !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findProjectById(id) {
        try {
            return prisma.proyectos.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllProjectsByUserId(userId) {
        try {
            return prisma.proyectos.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateProject(id, updateData) {
        try {
            return prisma.proyectos.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleteProject(id) {
        try {
            return prisma.proyectos.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ProjectRepository();