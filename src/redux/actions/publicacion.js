export const GET = "[publicacion] GET";
export const ADD = "[publicacion] ADD";
export const PATCH = "[publicacion] PATCH";
export const UPDATE = "[publicacion] UPDATE";
export const REMOVE = "[publicacion] REMOVE";

export const GET_SUCCESS = "[publicacion] GET success";
export const ADD_SUCCESS = "[publicacion] ADD success";
export const PATCH_SUCCESS = "[publicacion] PATCH success";
export const UPDATE_SUCCESS = "[publicacion] UPDATE success";
export const REMOVE_SUCCESS = "[publicacion] REMOVE success";

export const GET_ERROR = "[publicacion] GET error";
export const ADD_ERROR = "[publicacion] ADD error";
export const PATCH_ERROR = "[publicacion] PATCH error";
export const UPDATE_ERROR = "[publicacion] UPDATE error";
export const REMOVE_ERROR = "[publicacion] REMOVE error";

export const get = (options) => ({
    type: GET,
    options: options,
    //token: token
});

export const add = (body, token) => ({
    type: ADD,
    body: body,
    token: token
});

export const update = (id, body, token) => ({
    type: UPDATE,
    id: id,
    body: body,
    token: token
});

export const patch = (id, body, token) => ({
    type: PATCH,
    id: id,
    body: body,
    token: token
});

export const remove = (id, token) => ({
    type: REMOVE,
    id: id,
    token: token
});

