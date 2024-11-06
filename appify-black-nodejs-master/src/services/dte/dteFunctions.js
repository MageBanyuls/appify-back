import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import dteReal from "./dteReal.js";
import dteTemporal from "./dteTemporal.js";
import DtePayloadBuilder from "./dtePayloadBuilder.js";
class FacturaElectronica {
    constructor() {
        this.factura = {
            Encabezado: {
                IdDoc: {
                    TipoDTE: null,
                    FchEmis: null,
                    Folio: null
                },
                Emisor: {
                    RUTEmisor: null
                },
                Receptor: {
                    RUTRecep: null,
                    RznSocRecep: null,
                    GiroRecep: null,
                    Contacto: null,
                    CorreoRecep: null,
                    DirRecep: null,
                    CmnaRecep: null
                },
                Totales: {
                    MntNeto: null,
                    TasaIVA: null,
                    IVA: null,
                    MntTotal: null
                }
            },
            Detalle: [],
            DscRcgGlobal: null,
            Referencia: []
        };
    }
    inicializarFactura(tipoDTE, fechaEmision, folio, rutEmisor, rutReceptor, razonSocialReceptor, giroReceptor, contacto, correoReceptor, direccionReceptor, comunaReceptor) {
        this.factura.Encabezado.IdDoc.TipoDTE = tipoDTE;
        this.factura.Encabezado.IdDoc.FchEmis = fechaEmision;
        this.factura.Encabezado.IdDoc.Folio = folio;
        this.factura.Encabezado.Emisor.RUTEmisor = rutEmisor;
        this.factura.Encabezado.Receptor = {
            RUTRecep: rutReceptor,
            RznSocRecep: razonSocialReceptor,
            GiroRecep: giroReceptor,
            Contacto: contacto,
            CorreoRecep: correoReceptor,
            DirRecep: direccionReceptor,
            CmnaRecep: comunaReceptor
        };
    }
    agregarTotales(totales) {
        this.factura.Encabezado.Totales = totales;
    }
    agregarDetalle(item) {
        this.factura.Detalle.push(item);
    }
    agregarReferencia(referencia) {
        if (referencia) {
            this.factura.Referencia.push(referencia);
        }
    }
    agregarDescuentoGlobal(descuentoGlobal) {
        if (descuentoGlobal) {
            this.factura.DscRcgGlobal = descuentoGlobal;
        }
    }
    obtenerFactura() {
        return this.limpiarFactura(this.factura);
    }
    limpiarFactura(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => this.limpiarFactura(item)).filter(item => item !== null);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.entries(obj)
                .map(([key, value]) => [key, this.limpiarFactura(value)])
                .reduce((acc, [key, value]) => (value !== null ? { ...acc, [key]: value } : acc), {});
        } else {
            return obj;
        }
    }
}
let factura = new FacturaElectronica();
export const crearFacturaSimple = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.referencias && Array.isArray(data.referencias)) {
        data.referencias.forEach(referencia => factura.agregarReferencia(referencia));
    }
    return factura.obtenerFactura();
}
export const crearFacturaConDescuento = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.referencias && Array.isArray(data.referencias)) {
        data.referencias.forEach(referencia => factura.agregarReferencia(referencia));
    }
    return factura.obtenerFactura();
}
export const crearFacturaConDescuentoGlobal = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.descuentoGlobal) {
        factura.agregarDescuentoGlobal(data.descuentoGlobal);
    }
    if (data.referencias && Array.isArray(data.referencias)) {
        data.referencias.forEach(referencia => factura.agregarReferencia(referencia));
    }
    return factura.obtenerFactura();
}
export const crearNotaCreditoCorrigeTexto = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.razonSocialEmisor, data.giroEmisor, data.acteco, data.dirOrigen, data.cmnaOrigen, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.totales) {
        factura.agregarTotales(data.totales);
    }
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.referencia) {
        factura.agregarReferencia(data.referencia);
    }
    return factura.obtenerFactura();
}
export const crearNotaCreditoAnulaDoc = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.razonSocialEmisor, data.giroEmisor, data.acteco, data.dirOrigen, data.cmnaOrigen, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.totales) {
        factura.agregarTotales(data.totales);
    }
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.referencia) {
        factura.agregarReferencia(data.referencia);
    }
    return factura.obtenerFactura();
}
export const crearNotaDebito = (data) => {
    factura.inicializarFactura(data.tipoDTE, data.fechaEmision, data.folio, data.rutEmisor, data.razonSocialEmisor, data.giroEmisor, data.acteco, data.dirOrigen, data.cmnaOrigen, data.rutReceptor, data.razonSocialReceptor, data.giroReceptor, data.contacto, data.correoReceptor, data.direccionReceptor, data.comunaReceptor);
    if (data.totales) {
        factura.agregarTotales(data.totales);
    }
    if (data.detalles && Array.isArray(data.detalles)) {
        data.detalles.forEach(detalle => factura.agregarDetalle(detalle));
    }
    if (data.referencias && Array.isArray(data.referencias)) {
        data.referencias.forEach(referencia => factura.agregarReferencia(referencia));
    }
    return factura.obtenerFactura();
}

