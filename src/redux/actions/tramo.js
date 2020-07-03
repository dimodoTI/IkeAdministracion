export const GET = "[tramo] GET";
export const ADD = "[tramo] ADD";
export const PATCH = "[tramo] PATCH";
export const UPDATE = "[tramo] UPDATE";
export const REMOVE = "[tramo] REMOVE";

export const GET_SUCCESS = "[tramo] GET success";
export const ADD_SUCCESS = "[tramo] ADD success";
export const PATCH_SUCCESS = "[tramo] PATCH success";
export const UPDATE_SUCCESS = "[tramo] UPDATE success";
export const REMOVE_SUCCESS = "[tramo] REMOVE success";

export const GET_ERROR = "[tramo] GET error";
export const ADD_ERROR = "[tramo] ADD error";
export const PATCH_ERROR = "[tramo] PATCH error";
export const UPDATE_ERROR = "[tramo] UPDATE error";
export const REMOVE_ERROR = "[tramo] REMOVE error";




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