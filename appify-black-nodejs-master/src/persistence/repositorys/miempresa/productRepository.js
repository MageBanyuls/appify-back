import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js";
class ProductRepository {
    async createProduct(data) {
        try {
            return prisma.productos.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async createProductWithProveedor(productData, proveedorId) {
        try {
            // Crear el producto
            const createdProduct = await prisma.productos.create({
                data: productData
            });
    
            // Crear la entrada en la tabla proveedor_productos
             const proveedorProducto = await prisma.proveedor_productos.create({
                data: {
                    proveedor: proveedorId,
                    idProducto: createdProduct.id
                }
            });
    
            return [{...createdProduct, lista: proveedorProducto}];
        } catch (error) {
            console.log(error.message)
            handlePrismaError(error);
        }
    }
    async findProductById(id) {
        try {
            return prisma.productos.findUnique({
                where: { id: id
                    //user: userid
                }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async productExistsByName(nameProduct,user) {
        try {
            const nombre = await prisma.productos.findFirst({
                where: {
                    nombre : nameProduct,
                    user : user
                },
            })
            return nombre !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllProductsByUserId(userId) {
        try {
            return prisma.productos.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateProduct(id, updateData) {
        try {
            return prisma.productos.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteProduct(id) {
        try {
            return prisma.productos.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ProductRepository();