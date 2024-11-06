import { ResponseHandler } from "../utils/dependencys/injection.js";
import mpService from "../services/mpService.js";
import "dotenv/config";
import axios from "axios";

export const testMPController = async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    ResponseHandler.Unauthorized(res, "Falta la query");
  }
  try {
    ResponseHandler.Ok(res, code);
  } catch (error) {
    ResponseHandler.HandleError(res, error);
  }
};

let userEmail = "";

export const preferencesMp = async (req, res, next) => {
  try {
    userEmail = req.body.payer.email;
    const { payer, token, transaction_amount } = req.body;
    const data = {
      preapproval_plan_id: "2c9380848fde7fa4018ff336772906f5",
      payer_email: "test_user_422112672@testuser.com",
      card_token_id: token,
      status: "authorized",
    };

    const generarSuscripcion = async () => {
      try {
        const response = await axios.post(
          "https://api.mercadopago.com/preapproval",
          data,
          {
            headers: {
              Authorization: process.env.MP_ACCESS_TOKEN,
            },
          }
        );
        console.log("response first endpoint:", response.data.payer_id);
        const payerId = response.data.payer_id;
        console.log("res first endpoint statusCode:", res.statusCode);
        if (res.statusCode === 200) {
          try {
            const response1 = await axios.get(
              "https://api.mercadopago.com/v1/payments/search",
              {
                params: {
                  access_token:
                    "APP_USR-5043671826474347-060509-dd68ec8da1fa36fdcba746cf4f429bb5-1677027160",
                  status: "approved",
                  offset: 0,
                  limit: 10,
                  "payer.id": payerId,
                },
              }
            );
            ResponseHandler.Ok(res, response1.data);
            /* console.log("response1.data", response1.data); */
            console.log("response1.data.id", response1.data.results[0].id);
            const paymentId1 = response1.data.results[0].id;
            console.log(
              "response1.data.date_created",
              response1.data.results[0].date_created
            );
            const startDate1 = response1.data.results[0].date_created;
            await feedbackMp(paymentId1, startDate1);
          } catch (error) {
            console.error(
              "There has been a problem with your axios operation in second endpoint:",
              error
            );
          }
        }
      } catch (error) {
        ResponseHandler.HandleError(res, error);
        console.error("Error first endpoint:", error);
      }
    };

    if (token) {
      await generarSuscripcion();
    }
  } catch (error) {
    console.error("Error first endpoint 1:", error);
    ResponseHandler.HandleError(res, error);
  }
};

async function feedbackMp(paymentId1, startDate1) {
  try {
    const email = userEmail;
    console.log("entre a feedback:");
    console.log("startDate:", startDate1);
    const startDate = new Date(startDate1);
    startDate.setMonth(startDate.getMonth() + 12);
    const endDate = startDate.toISOString(); // '2025-05-30T15:19:08.000Z'
    console.log("End Date:", endDate);
    const paymentId = paymentId1;
    const result = await mpService.registerPay(paymentId, email, endDate);
    /*  ResponseHandler.Ok(200, result); */
    console.log("Result after saving in db", result);
  } catch (error) {
    console.error("Error al validar el email:", error);
    /* ResponseHandler.HandleError(400, error); */
  }
}
