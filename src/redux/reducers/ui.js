import {
    SHOW_SPINNER,
    HIDE_SPINNER,
    SHOW_ERROR,
    HIDE_ERROR,
    SELECT_MENU,
    SET_MEDIA,
    TOGGLE_MENU,
    MODO_PANTALLA,
    CANCELAR_TIMER,
    SET_TIMER
} from "../actions/ui";

const initialState = {
    loading: 0,
    errorTimestamp: false,
    errorMessages: null,
    opcionSeleccionada: {
        option: "",
        timeStamp: null
    },
    media: {
        size: "large",
        timeStamp: null
    },
    menuOpen: true,
    timeStampPantalla: null,
    quePantalla: null,
    timer: null,
    intervalo: null,
    tiempo: null,
    pantallaQueLLamo: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case SHOW_SPINNER:
            newState.loading += 1;
            break;
        case HIDE_SPINNER:
            newState.loading -= 1;
            break;
        case SHOW_ERROR:
            newState.errorTimeStamp = (new Date()).getTime()
            newState.errorMessages = action.message
            break;
        case HIDE_ERROR:
            newState.errorTimeStamp = (new Date()).getTime()
            newState.errorMessages = null
            break;
        case SELECT_MENU:
            newState.opcionSeleccionada.option = action.option
            newState.opcionSeleccionada.timeStamp = (new Date()).getTime()
            break;
        case SET_MEDIA:
            newState.media.size = action.size
            newState.media.timeStamp = (new Date()).getTime()
            break;
        case TOGGLE_MENU:
            newState.menuOpen = !newState.menuOpen
            break;
        case MODO_PANTALLA:
            newState.timeStampPantalla = (new Date()).getTime()
            newState.quePantalla = action.quePantalla
            newState.pantallaQueLLamo = action.pantallaQueLLamo
            break;
        case SET_TIMER:
            if (newState.timer) clearTimeout(newState.timer)
            if (newState.intervalo) clearInterval(newState.intervalo)
            newState.timer = action.timer
            newState.intervalo = action.intervalo
            newState.tiempo = action.tiempo
            newState.pantallaQueLLamo = action.pantallaQueLLamo
            break;
        case CANCELAR_TIMER:
            if (newState.timer) clearTimeout(newState.timer)
            if (newState.intervalo) clearInterval(newState.intervalo)
            break;
        case SET_MEDIA:
            newState.media.size = action.size
            newState.media.timeStamp = (new Date()).getTime()
            break;
    }
    return newState;
};