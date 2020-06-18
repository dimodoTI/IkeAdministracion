import {
    GET,
    GET_SUCCESS,
    GET_ERROR
} from "../actions/publicidad";


const initialState = {
    entities: [],
    timeStamp: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET:
            newState.entities = [{ tipo: "A", imagen: "--imagen-regalo", texto: "0", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "A", imagen: "--imagen-carrito", texto: "1", color: "--color-amarillo", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "A", imagen: "--imagen-reloj", texto: "2", color: "--color-rosa", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "A", imagen: "--imagen-regalo", texto: "3", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades01", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades02", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades03", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades03", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades03", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "B", imagen: "--imagen-novedades03", texto: "", color: "--color-celeste", http: "http://www.ikeargentina.com.ar/" },
            { tipo: "C", imagen: "--imagen-fondo-agenda", texto: "0", color: "--color-amarillo-claro", http: "http://www.ikeargentina.com.ar/" }
            ]
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_SUCCESS:
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.timeStamp = (new Date()).getTime();
            break;
    }
    return newState;
};