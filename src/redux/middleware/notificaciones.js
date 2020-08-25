import {
    GET,
    GET_SUCCESS,
    GET_ERROR,
    ADD,
    ADD_SUCCESS,
    ADD_ERROR


} from "../actions/notificaciones";

import {


    ikeNotificacionCabeceraQuery,
    ikeNotificaciones

} from "../fetchs"

import {
    RESTAdd,
} from "../actions/REST"

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

export const add = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === ADD) {
        dispatch(RESTAdd(ikeNotificaciones, action.notificacion, ADD_SUCCESS, ADD_ERROR, action.token))
    }
};

export const processGet = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_SUCCESS || action.type === ADD_SUCCESS) {

    }
};

export const processError = ({
    dispatch
}) => next => action => {
    next(action);
    if (action.type === GET_ERROR || ADD_ERROR) {

    }
};

export const middleware = [get, add, processGet, processError];