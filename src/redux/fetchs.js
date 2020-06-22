import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"
import {
  fetchFactory
} from "../libs/fetchFactory"

const webApiUsuarios = "http://64.227.109.20:8080/api"
const webApiMascotas = "http://64.227.109.20:8081/api"

export const ikeUsuarioFetch = fetchFactory(webApiUsuarios, "Usuario")
export const ikeLoginFetch = fetchFactory(webApiUsuarios, "Autorizacion/login")
export const ikeRenovacionFetch = fetchFactory(webApiUsuarios, "Autorizacion/renovacion")
export const ikeRecuperoFetch = fetchFactory(webApiUsuarios, "Autorizacion/recupero")
export const ikeLogonFetch = fetchFactory(webApiUsuarios, "Autorizacion/logon")
export const ikeUpdateProfileFetch = fetchFactory(webApiUsuarios, "Autorizacion/updateProfile")

export const ikeMascotasTipo = fetchFactory(webApiMascotas, "MascotasTipo")
export const ikeRazas = fetchFactory(webApiMascotas, "Razas")
/* let app = "DigitalizacionExpedientes"
let dominio = "http://localhost/" + app
if (process.env.NODE_ENV == 'production') {
  dominio = window.location.protocol + "//" + window.location.hostname + "/Intranet/" + app
} */

/* const DigitalizacionExpedientes = ODataFetchFactory({
  fetch: fetch,
  domain: dominio
});

export const expediente = ODataEntity(DigitalizacionExpedientes, "Traer")
export const documentacion = ODataEntity(DigitalizacionExpedientes, "DocumentacionxExpte")
export const documentos = ODataEntity(DigitalizacionExpedientes, "Documentacion")
export const imagenHistorico = ODataEntity(DigitalizacionExpedientes, "ImagenHistorico")
export const grabarImagen = ODataEntity(DigitalizacionExpedientes, "GrabarImagen")
export const expedienteMarcar = ODataEntity(DigitalizacionExpedientes, "Marcar")
export const estados = ODataEntity(DigitalizacionExpedientes, "DocumentacionxExpte_Estado")
export const asignarImagen = ODataEntity(DigitalizacionExpedientes, "AsignarImagen")
export const asignarImagenes = ODataEntity(DigitalizacionExpedientes, "AsignarImagenes")
export const cerrar = ODataEntity(DigitalizacionExpedientes, "Cerrar")
export const eventos = ODataEntity(DigitalizacionExpedientes, "EvetoEve_Imagenes")
export const envio = ODataEntity(DigitalizacionExpedientes, "PasarDP") */