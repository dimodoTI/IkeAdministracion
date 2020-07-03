import {
  combineReducers
} from "redux";
import {
  reducer as uiReducer
} from "./ui"
import { reducer as publicacionReducer } from "./publicacion"
import { reducer as reservaReducer } from "./reserva"
import {
  reducer as usuarioReducer
} from "./usuario"
import {
  reducer as autorizacionReducer
} from "./autorizacion"

import {
  reducer as clienteReducer
} from "./cliente"

import {
  reducer as mascotasTipoReducer
} from "./mascotastipo"

import {
  reducer as razasReducer
} from "./razas"

import {
  reducer as puestosReducer
} from "./puestos"
import {
  reducer as vacunaReducer
} from "./vacuna"
import {
  reducer as calendarioReducer
} from "./calendario"
import {
  reducer as configuracionReducer
} from "./configuracion"
import {
  reducer as tramoReducer
} from "./tramo"

export const rootReducer = (state = {}, action) => {

  return {
    ui: uiReducer(state.ui, action),
    publicacion: publicacionReducer(state.publicacion, action),
    reserva: reservaReducer(state.reserva, action),
    usuario: usuarioReducer(state.usuario, action),
    autorizacion: autorizacionReducer(state.autorizacion, action),
    cliente: clienteReducer(state.cliente, action),
    mascotastipo: mascotasTipoReducer(state.mascotastipo, action),
    razas: razasReducer(state.razas, action),
    puestos: puestosReducer(state.puestos, action),
    vacuna: vacunaReducer(state.vacuna, action),
    calendario: calendarioReducer(state.calendario, action),
    configuracion: configuracionReducer(state.configuracion, action),
    tramo: tramoReducer(state.tramo, action)
    // titular: titularReducer(state.titular, action),
    // mascotas: mascotasReducer(state.mascotas, action),
    // hc: hcReducer(state.hc, action),
    // agenda: agendaReducer(state.agenda, action)
  };
};