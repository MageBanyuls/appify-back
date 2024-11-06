import mpRepository from "../persistence/repositorys/mpRepository.js";
import { CustomError } from "../utils/httpRes/handlerResponse.js";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ResponseHandler } from "../utils/dependencys/injection.js";
import "dotenv/config";

class mpService {
  // El id tiene que ser el email con el que empezo a crear el user
  async registerPay(paymentId, id, endDate) {
    console.log("registerpay inside");
    try {
      const client = new MercadoPagoConfig({
        accessToken:
          "APP_USR-5043671826474347-060509-dd68ec8da1fa36fdcba746cf4f429bb5-1677027160",
        options: { timeout: 5000 },
      });
      console.log("paymentid:", paymentId);
      console.log("endDate in mpService:", endDate);
      const payment = await new Payment(client).get({ id: paymentId });
      console.log("RegisterPay - Payment Status:", payment.status);
      console.log("RegisterPay - Payment Payer:", payment.payer);

      if (payment.status === "approved") {
        console.log("RegisterPay - Payment Approved");
        console.log("id:", id);
        const data = {
          id: id,
          currency_id: payment.currency_id,
          date_approved: payment.date_approved,
          payer_email: payment.payer.email,
          payer_phone: payment.payer.phone.number,
          payment_type_id: payment.payment_type_id,
          payer_rut: payment.payer.identification.number,
          duracion: endDate,
          register: true,
        };
        return await mpRepository.registerPay(data);
      } else {
        throw new CustomError("400", "Payment not approved");
      }
    } catch (error) {
      console.error("RegisterPay - Error:", error);
      throw new CustomError("500", error.message || "Internal Server Error");
    }
  }
}

export default new mpService();
