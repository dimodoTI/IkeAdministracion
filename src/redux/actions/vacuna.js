export const GET = "[vacuna] GET";
export const ADD = "[vacuna] ADD";
export const PATCH = "[vacuna] PATCH";
export const UPDATE = "[vacuna] UPDATE";
export const REMOVE = "[vacuna] REMOVE";

export const GET_SUCCESS = "[vacuna] GET success";
export const ADD_SUCCESS = "[vacuna] ADD success";
export const PATCH_SUCCESS = "[vacuna] PATCH success";
export const UPDATE_SUCCESS = "[vacuna] UPDATE success";
export const REMOVE_SUCCESS = "[vacuna] REMOVE success";

export const GET_ERROR = "[vacuna] GET error";
export const ADD_ERROR = "[vacuna] ADD error";
export const PATCH_ERROR = "[vacuna] PATCH error";
export const UPDATE_ERROR = "[vacuna] UPDATE error";
export const REMOVE_ERROR = "[vacuna] REMOVE error";

export const get = (options) => ({
    type: GET,
    options: options
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