export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";
export const SHOW_ERROR = "[ui] show error";
export const HIDE_ERROR = "[ui] hide error";
export const SELECT_MENU = "[ui] seelct menu";
export const CAPTURE_MEDIA = "[ui] capture media"
export const SET_MEDIA = "[ui] set media"
export const TOGGLE_MENU = "[ui] toggle menu"
export const MODO_PANTALLA = "[ui] MODO_PANTALLA"
export const DISPARAR_TIMER = "[ui] DISPARAR_TIMER"
export const CANCELAR_TIMER = "[ui] CANCELAR_TIMER"
export const SET_TIMER = "[ui] SET_TIMER"
export const SET_CONTADOR = "[ui] SET_CONTADOR"

export const showSpinner = () => ({
  type: SHOW_SPINNER
});
export const hideSpinner = () => ({
  type: HIDE_SPINNER
});
export const showError = (message) => ({
  type: SHOW_ERROR,
  message: message
});
export const hideError = () => ({
  type: HIDE_ERROR
});
export const selectMenu = (option) => ({
  type: SELECT_MENU,
  option: option
});
export const captureMedia = () => ({
  type: CAPTURE_MEDIA
});
export const setMedia = (size) => ({
  type: SET_MEDIA,
  size: size
});
export const toggleMenu = () => ({
  type: TOGGLE_MENU
});
export const modoPantalla = (quePantalla, pantallaQueLLamo) => ({
  type: MODO_PANTALLA,
  quePantalla: quePantalla,
  pantallaQueLLamo: pantallaQueLLamo
});
export const dispararTimer = (tiempo, target, pantallaQueLLamo) => ({
  type: DISPARAR_TIMER,
  tiempo: tiempo,
  target: target,
  pantallaQueLLamo: pantallaQueLLamo
});
export const setTimer = (timer, intervalo, tiempo, pantallaQueLLamo) => ({
  type: SET_TIMER,
  timer: timer,
  intervalo: intervalo,
  tiempo: tiempo,
  pantallaQueLLamo: pantallaQueLLamo
});
export const cancelarTimer = () => ({
  type: CANCELAR_TIMER
});
export const setContador = (tiempo) => ({
  type: SET_CONTADOR,
  tiempo: tiempo
});