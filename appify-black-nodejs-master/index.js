import express from "express";
/* import http from "http"; */
/* import initializeSocket from "./src/socket/indexSocket.js"; */
import userRouter from "./src/routes/miempresa/userRouter.js";
import proveedorRouter from "./src/routes/miempresa/proovRouter.js";
import listrouter from "./src/routes/miempresa/priceListRouter.js";
import productsrouter from "./src/routes/miempresa/productsRouter.js";
import servicerouter from "./src/routes/miempresa/serviceRouter.js";
import clientesrouter from "./src/routes/comercial/clientesRouter.js";
import projectsrouter from "./src/routes/comercial/projectsRouter.js";
import ordentrabajorouter from "./src/routes/operaciones/ordentrabajoRouter.js";
import ordencomprarouter from "./src/routes/operaciones/ordenCompraRouter.js";
import itemprodservrouter from "./src/routes/operaciones/itemProdServOrdenCompraRouter.js";
import conciliacionrouter from "./src/routes/conciliacion/conciliacionRouter.js";
import itemprojectsrouter from "./src/routes/comercial/itemsProdServProyectoRouter.js";
import contactorouter from "./src/routes/comercial/contactosClienteRouter.js";
import puntodespachorouter from "./src/routes/comercial/puntoDespachoClienteRouter.js";
import anticiposrouter from "./src/routes/comercial/anticiposClienteProvRouter.js";
import costorouter from "./src/routes/comercial/costoProyectoRouter.js";
import consultasrouter from "./src/routes/comercial/consultasRouter.js";
import ecommercerouter from "./src/routes/comercial/ecommerceRouter.js";
import sistemRouter from "./src/routes/miempresa/configs/sistemaRouter.js";
import comercialRouter from "./src/routes/miempresa/configs/comercialRouter.js";
import contabilidadRouter from "./src/routes/miempresa/configs/contabilidadRouter.js";
import ventasRouter from "./src/routes/administracion/ventasRouter.js";
import transportistaRouter from "./src/routes/administracion/transportistaRouter.js";
import cobrosRouter from "./src/routes/administracion/cobrosRouter.js";
import pagosRouter from "./src/routes/administracion/pagosRouter.js";
import cuentasRouter from "./src/routes/administracion/cuentasRouter.js";
import comprasRouter from "./src/routes/administracion/comprasRouter.js";
import initRouter from "./src/routes/initConfig/initConfigRouter.js";
import mpRouter from "./src/routes/mpRouter.js";
import dteRouter from "./src/routes/dte/dteRouter.js";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOpts } from "./src/docs/swaggerOpts.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();
/* export const server = http.createServer(app); */

const PORT = process.env.PORT || 8080;
/* const SOCKET_PORT = process.env.SOCKET_PORT || 8081; */

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Configuraciones iniciales para un usuario que contrata el servicio

app.use("/init", initRouter);

// Routers a Mi Empresa

app.use("/user", userRouter);
app.use("/proveedor", proveedorRouter);
app.use("/listproducts", listrouter);
app.use("/products", productsrouter);
app.use("/services", servicerouter);

//dentro de mi empresa configs

app.use("/sistema", sistemRouter);
app.use("/comercial", comercialRouter);
app.use("/contabilidad", contabilidadRouter);

// Routers a comercial

app.use("/clientes", clientesrouter);
app.use("/projects", projectsrouter);
app.use("/contacto", contactorouter);
app.use("/consultas", consultasrouter);
app.use("/ecommerces", ecommercerouter);
app.use("/projectsitem", itemprojectsrouter);
app.use("/puntoDes", puntodespachorouter);
app.use("/costosProyecto", costorouter);
app.use("/anticipos", anticiposrouter);

// Routers a Operaciones

app.use("/ordenTrabajo", ordentrabajorouter);
app.use("/ordenCompra", ordencomprarouter);
app.use("/h", itemprodservrouter);

// Router a conciliacion

app.use("/conciliacion", conciliacionrouter);

// Routers a Administracion
app.use("/administracion", ventasRouter);
app.use("/administracion", comprasRouter);
app.use("/transportista", transportistaRouter);
app.use("/cobros", cobrosRouter);
app.use("/pagos", pagosRouter);
app.use("/cuentas", cuentasRouter);

//Router mercado pago
app.use("/mp", mpRouter);

//Router a DTE
app.use("/dte", dteRouter);

app.get("/", (req, res) => {
  res.json("Estoy desplegado hijo, pruebame 👉👌");
});

const specs = swaggerJSDoc(swaggerOpts);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});

/* server.listen(SOCKET_PORT, () => {
  console.log(`Socket.IO server running on port ${SOCKET_PORT}`);
});

initializeSocket(server);
 */
