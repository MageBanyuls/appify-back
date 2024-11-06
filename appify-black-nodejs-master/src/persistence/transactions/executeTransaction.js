import { prisma } from "../../utils/dependencys/injection.js";
import handlePrismaError from "../../utils/httpRes/handlePrismaError.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
async function executeTransactions(operations) {
    try {
        //console.log("ESTAS SON LAS OPERACIONES QUE RECIBE executeTransactions", operations)
        const result = await prisma.$transaction(operations);
        return result; // Puede que quieras retornar el resultado directamente sin formatearlo como string
    } catch (error) {
        //console.log(error)
        //throw new CustomError(500, 'Transaction failed', error);
        throw error
    }
}
export default executeTransactions;