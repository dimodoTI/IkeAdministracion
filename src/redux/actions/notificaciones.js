export const GET = "[notificaciones] GET";
export const GET_SUCCESS = "[notificaciones] GET success";
export const GET_ERROR = "[notificaciones] GET error";

export const ADD = "[notificaciones] ADD";
export const ADD_SUCCESS = "[notificaciones] ADD success";
export const ADD_ERROR = "[notificaciones] ADD error";


export const get = (options) => ({
    type: GET,
    options: options,
});

export const add = (notificacion, token) => ({
    type: ADD,
    notificacion: notificacion,
    token: token
});