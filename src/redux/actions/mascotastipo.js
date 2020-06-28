export const GET = "[mascotastipo] GET";
export const ADD = "[mascotastipo] ADD";
export const PATCH = "[mascotastipo] PATCH";
export const UPDATE = "[mascotastipo] UPDATE";
export const REMOVE = "[mascotastipo] REMOVE";

export const GET_SUCCESS = "[mascotastipo] GET success";
export const ADD_SUCCESS = "[mascotastipo] ADD success";
export const PATCH_SUCCESS = "[mascotastipo] PATCH success";
export const UPDATE_SUCCESS = "[mascotastipo] UPDATE success";
export const REMOVE_SUCCESS = "[mascotastipo] REMOVE success";

export const GET_ERROR = "[mascotastipo] GET error";
export const ADD_ERROR = "[mascotastipo] ADD error";
export const PATCH_ERROR = "[mascotastipo] PATCH error";
export const UPDATE_ERROR = "[mascotastipo] UPDATE error";
export const REMOVE_ERROR = "[mascotastipo] REMOVE error";

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