import productRepository from "../../persistence/repositorys/miempresa/productRepository.js";
import conciliacionService from "../../services/conciliacion/conciliacionService.js";
import { ResponseHandler } from "../../utils/dependencys/injection.js";
import axios from "axios";
import "dotenv/config";

export const saveBankData = async (req, res) => {
  try {
    const data = req.body;
    await conciliacionService.saveBankData(data);
    ResponseHandler.Ok(res, "Ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const createMovimientos = async (req, res) => {
  try {
    const data = req.body;
    await conciliacionService.createMovimientos(data);
    ResponseHandler.Ok(res, "Ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};

export const createCuentaLink = async (req, res) => {
  try {
    const data = req.body;
    await conciliacionService.createCuentaLink(data);
    ResponseHandler.Ok(res, "OK");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getLinkByUserId = async (req, res) => {
  try {
    const userid = req.params;
    await conciliacionService.getLinkByUserId(userid);
    ResponseHandler.Ok(res, "ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};

export const unlinkCuentaBancariaById = async (req, res) => {
  try {
    const { id } = req.params;
    await conciliacionService.unlinkCuentaBancariaById(id);
    ResponseHandler.Ok(res); // <- Aquí debería ser ResponseHandler.Ok(res);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};


export const getCuentasBancariasAllDataByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const response =
      await conciliacionService.getCuentasBancariasAllDataByUserId(userId);
    ResponseHandler.Ok(res, response);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getCuentaLinkById = async (req, res) => {
  try {
    const id = req.params;
    await conciliacionService.getCuentaLinkById(id);
    ResponseHandler.Ok(res, "ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getCuentasByCuentaId = async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const respuesta = await conciliacionService.getCuentasByCuentaId(cuentaId);
    ResponseHandler.Ok(res, respuesta);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getMovimientosById = async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await conciliacionService.getMovimientosById(id);
    ResponseHandler.Ok(res, respuesta);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};

export const getMovimientosFintoc = async (req, res) => {
  const account_id = req.query.account_id;
  try {
    const response = await axios.get(
      `https://api.fintoc.com/v1/accounts/${account_id}/movements`,
      {
        params: {
          link_token: req.query.link_token,
          since: req.query.since,
          until: req.query.until,
        },
        headers: {
          Authorization: process.env.SK_LIVE_FINTOC,
          Accept: "application/json",
        },
      }
    );
    ResponseHandler.Ok(res, response.data);
  } catch (error) {
    ResponseHandler.HandleError(res, err);
  }
};

export const getConciliacionesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const respuesta = await conciliacionService.getConciliacionesByUserId(
      userId
    );
    ResponseHandler.Ok(res, respuesta);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getCuentasBancariasByConciliacionId = async (req, res) => {
  try {
    const { conciliacionId } = req.params;
    const respuesta =
      await conciliacionService.getCuentasBancariasByConciliacionId(
        conciliacionId
      );
    ResponseHandler.Ok(res, respuesta);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const getMovimientosByCuentaId = async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const respuesta = await conciliacionService.getMovimientosByCuentaId(
      cuentaId
    );
    ResponseHandler.Ok(res, respuesta);
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const updateUserConciliacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body; // Solo extraer el campo 'user' del cuerpo de la solicitud
    await conciliacionService.updateUserConciliacion(id, user); // Pasar solo 'user' al servicio
    ResponseHandler.Ok(res, "ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
export const updateCuentaBancariaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    await conciliacionService.updateCuentaBancariaById(id, activo); // Pasar solo 'user' al servicio
    // console.log(activo)
    // console.log(id)
    ResponseHandler.Ok(res, "ok");
  } catch (err) {
    ResponseHandler.HandleError(res, err);
  }
};
