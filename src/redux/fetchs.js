import {
  ODataEntity,
  ODataFetchFactory
} from "@brunomon/odata-fetch-factory"
import {
  fetchFactory
} from "../libs/fetchFactory"

const webApiUsuarios = "http://64.227.109.20:8080/api"
const webApiUsuariosOdata = "http://64.227.109.20:8080"
const webApiMascotas = "http://64.227.109.20:8081/api"
const webApiMascotasOdata = "http://64.227.109.20:8081"
const webApiPublicacion = "http://64.227.109.20:8082/api"
const webApiPublicacionOdata = "http://64.227.109.20:8082"

const mascotaOdata = ODataFetchFactory({ fetch: fetch, domain: webApiMascotasOdata })
const usuarioOdata = ODataFetchFactory({ fetch: fetch, domain: webApiUsuariosOdata })
const publicacionOdata = ODataFetchFactory({ fetch: fetch, domain: webApiPublicacionOdata })

export const ikeUsuarioFetch = fetchFactory(webApiUsuarios, "Usuario")
export const ikeOdataUsuarioFetch = ODataEntity(usuarioOdata, "UsuarioQuery")
export const ikeLoginFetch = fetchFactory(webApiUsuarios, "Autorizacion/login")
export const ikeRenovacionFetch = fetchFactory(webApiUsuarios, "Autorizacion/renovacion")
export const ikeRecuperoFetch = fetchFactory(webApiUsuarios, "Autorizacion/recupero")
export const ikeLogonFetch = fetchFactory(webApiUsuarios, "Autorizacion/logon")
export const ikeUpdateProfileFetch = fetchFactory(webApiUsuarios, "Autorizacion/updateProfile")


export const ikeMascotas = fetchFactory(webApiMascotas, "Mascotas")
export const ikeOdataMascotasTipo = ODataEntity(mascotaOdata, "MascotasTipoQuery")
export const ikeRazas = fetchFactory(webApiMascotas, "Razas")
export const ikePublicaciones = fetchFactory(webApiPublicacion, "Publicaciones")
export const ikePuestos = fetchFactory(webApiMascotas, "Puestos")

export const ikeOdataMascotas = ODataEntity(mascotaOdata, "MascotasQuery")
export const ikeMascotasTipo = fetchFactory(webApiMascotas, "MascotasTipo")
export const ikeOdataRazas = ODataEntity(mascotaOdata, "RazasQuery")
export const ikeOdataPublicaciones = ODataEntity(publicacionOdata, "PublicacionesQuery")
export const ikePuestosQuery = ODataEntity(mascotaOdata, "PuestosQuery")

