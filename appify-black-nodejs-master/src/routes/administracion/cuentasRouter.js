import { Router } from 'express';
import { 
    createCuentasBanco,
    createCuentaBancoConciliacion,
    createCategoriaCuenta,
    createCuentaTipoDocumento,
    createBanco,
    createCondicionPago,
    getCuentaBancoById,
    getCuentaBancoConciliacionId,
    getCategoriaCuentaById,
    getCuentaTipodocumentoById,
    getCondicionPagoById,
    getCondicionesCondicionPagoById,
    getAllCuentasBancoByUserId,
    getAllCuentasBancoConciliacionByUserId,
    getAllCategoriasCuentaByUserId,
    getAllCuentasTipoDocumentoByUserId,
    getAllBancosByUserId,
    getAllCondicionPagoByUserId,
    updateCuentasBanco,
    updateCategoriaCuenta,
    updateCuentaTipoDoc,
    updateBanco,
    updateCondicionPago,
    updateCondicionesCondicionPago,
    getCondicionAndCondicionesByCondicionId

} from '../../controllers/administracion/cuentasController.js';
const router = Router();

// Ruta para crear una cuenta de banco
router.post('/crearCuentaBanco', createCuentasBanco);

// Ruta para crear una conciliacioo a una cuenta de banco, la conciliacion debe estar creada de antes.
router.post('/crearCuentaBancoConciliacion', createCuentaBancoConciliacion);

// Ruta para crear una categoria de cuenta
router.post('/crearCategoriaCuenta', createCategoriaCuenta);

// Ruta para crear un tipo de documento a la cuenta, no sabemos aun lo que es.
router.post('/crearCuentaTipoDoc', createCuentaTipoDocumento);

// Ruta para crear un banco
router.post('/crearBanco', createBanco);

// Ruta para crear condicion de pago con sus respectivas condiciones
router.post('/crearCondicionPago', createCondicionPago);

// Ruta para obtener una cuenta de banco especifica
router.get('/obtenerCuentaBanco/:id', getCuentaBancoById);

// Ruta para obtener una cuenta de banco conciliacion
router.get('/obtenerCuentaBancoConciliacion/:id', getCuentaBancoConciliacionId);

// Ruta para obtener una categoria de cuenta
router.get('/obtenerCategoriaCuenta/:id', getCategoriaCuentaById);

// Ruta para obtener un tipo de documento
router.get('/obtenerCuentaTipoDoc/:id', getCuentaTipodocumentoById);

// Ruta para obtener una condicion de pago
router.get('/obtenerCondicionPago/:id', getCondicionPagoById);

// Ruta para obtener condiciones de condicion de pago con el id de condicion de pago.
router.get('/obtenerCondicionesCpago/:id', getCondicionesCondicionPagoById);


// Ruta pra obtener la condicion con condiciones de pago con e id de condicion de pago
router.get('/obtenerConCondicionesP/:id', getCondicionAndCondicionesByCondicionId)
//Quizas estaria bueno hacer una ruta para btener la condicion de pago con sus condiciones, depende de como s eplanteee el front.

// Ruta para obtener todas las cuentas por ID de usuario
router.get('/todasCuentasBanco/:id', getAllCuentasBancoByUserId);

// Ruta para obtener todos los cobros por ID de usuario, no sirve.
// router.get('/todasCuentasBancoConciliacion/:id', getAllCuentasBancoConciliacionByUserId);

// Ruta para obtener todas las categorias de cuenta por ID de usuario
router.get('/todasCategoriaCuenta/:id', getAllCategoriasCuentaByUserId);

// Ruta para obtener todos los tipos de documento por ID de usuario
router.get('/todasCuentasTipoDoc/:id', getAllCuentasTipoDocumentoByUserId);

// Ruta para obtener todos los bancos por ID de usuario
router.get('/todosBancos/:id', getAllBancosByUserId);

// Ruta para obtener todos las condiciones de pago por ID de usuario
router.get('/todosCPago/:id', getAllCondicionPagoByUserId);

// Ruta para actualizar la tabla de cuenta de banco
router.put('/actualizarCuentaBanco/:id', updateCuentasBanco);

// Ruta para actualizar una categoria de cuenta
router.put('/actualizarCatCuenta/:id', updateCategoriaCuenta);

// Ruta para actualizar un Tipo de documento
router.put('/actualizarCTipoDoc/:id', updateCuentaTipoDoc);

// Ruta para actualizar un banco
router.put('/actualizarBanco/:id', updateBanco);

// Ruta para eliminar una condicion de pago
router.put('/actualizarCPago/:id', updateCondicionPago);

// Ruta para eliminar una condicion de condicion de pago
router.put('/actualizarCCPago/:id', updateCondicionesCondicionPago);


export default router

