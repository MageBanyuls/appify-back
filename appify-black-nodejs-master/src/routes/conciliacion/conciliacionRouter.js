import { Router } from "express";
import {
  saveBankData,
  createMovimientos,
  getLinkByUserId,
  getCuentasByCuentaId,
  getMovimientosById,
  getConciliacionesByUserId,
  getCuentasBancariasByConciliacionId,
  getMovimientosByCuentaId,
  getMovimientosFintoc,
  updateUserConciliacion,
  updateCuentaBancariaById,
  createCuentaLink,
  getCuentaLinkById,
  getCuentasBancariasAllDataByUserId,
  unlinkCuentaBancariaById,
} from "../../controllers/conciliacion/conciliacionController.js";

const router = Router();

// Creacion de conciliacion bancaria con respectivas cuentas para ese banco
router.post("/createCon", saveBankData);

// Creacion de uno o varios movimientos
router.post("/createMov", createMovimientos);

// Creacion de  vinculacion de cuenta de banco con la conciliacion
router.post("/createVinculacion", createCuentaLink);

/* AL FINAL NO SE PARA QUE HICE ESTA RUTA
router.get('/linkConciliacion/:userid', getLinkByUserId);*/

// Obtener cuenta Bancaria con el id de la cuenta
router.get("/BankAccount/:cuentaId", getCuentasByCuentaId);

// Obtener cuenta Bancaria con el id de la cuenta con el id de la cuenta de banco si es que existe
router.get("/obtenerVinculacion", getCuentaLinkById);

//Obtener los movimientos de la api de fintoc
router.get("/fintoc/movements", getMovimientosFintoc);

// Obtener los datos de un movimiento por su id
router.get("/movimiento/:id", getMovimientosById);

// Obtener todas las conciliaciones por user ID
router.get("/conciliaciones/:userId", getConciliacionesByUserId);

// Obtener todas las conciliaciones por user ID
router.get("/alldata/:userId", getCuentasBancariasAllDataByUserId);

// Obtener las cuentas bancarias por conciliacionID
router.get("/cuentas/:conciliacionId", getCuentasBancariasByConciliacionId);

// Obtener los movimientos de una cuenta por su ID
router.get("/movimientos/:cuentaId", getMovimientosByCuentaId);

// Actualizar el user que pidio la conciliacion bancaria despues que se creo
router.put("/update/:id", updateUserConciliacion);

// Actualizar cuenta bancatia para activarla
router.put("/bankUpdate/:id", updateCuentaBancariaById);

// Borrar de cuentasBacarias y link_fintoc_bancos cuando desviculan , con id
router.delete("/bankUnlink/:id", unlinkCuentaBancariaById);

export default router;
