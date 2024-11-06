import { prisma } from "../../utils/dependencys/injection.js";
import handlePrismaError from "../../utils/httpRes/handlePrismaError.js";
class mpRepository {
  async registerPay(data) {
    try {
      return prisma.pagoMercadopago.create({
        data: data,
      });
    } catch (error) {
      console.log("error repository mp", error);
      handlePrismaError(error);
    }
  }

  async findLinkByUserId(id) {
    try {
      console.log("i am looking for the email in the db:", id);
      return prisma.pagoMercadopago.findUnique({
        where: { id: id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
export default new mpRepository();
