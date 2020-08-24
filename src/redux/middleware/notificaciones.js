import {
    GET,
    GET_SUCCESS,
    GET_ERROR,


} from "../actions/notificaciones";

import {


    ikeNotificacionCabeceraQuery

} from "../fetchs"



import {
    apiRequest
} from "../actions/api"

export const get = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(ikeNotificacionCabeceraQuery, action.options, GET_SUCCESS, GET_ERROR))
    }
};



export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS) {

    }
};




export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR) {

    }
};

export const middleware = [get, processGet, processError];