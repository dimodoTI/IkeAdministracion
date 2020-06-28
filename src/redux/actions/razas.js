export const GET = "[razas] GET";
export const ADD = "[razas] ADD";
export const PATCH = "[razas] PATCH";
export const UPDATE = "[razas] UPDATE";
export const REMOVE = "[razas] REMOVE";

export const GET_SUCCESS = "[razas] GET success";
export const ADD_SUCCESS = "[razas] ADD success";
export const PATCH_SUCCESS = "[razas] PATCH success";
export const UPDATE_SUCCESS = "[razas] UPDATE success";
export const REMOVE_SUCCESS = "[razas] REMOVE success";

export const GET_ERROR = "[razas] GET error";
export const ADD_ERROR = "[razas] ADD error";
export const PATCH_ERROR = "[razas] PATCH error";
export const UPDATE_ERROR = "[razas] UPDATE error";
export const REMOVE_ERROR = "[razas] REMOVE error";




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