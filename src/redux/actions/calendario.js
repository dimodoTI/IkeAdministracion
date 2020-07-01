export const GET = "[calendario] GET";
export const ADD = "[calendario] ADD";
export const PATCH = "[calendario] PATCH";
export const UPDATE = "[calendario] UPDATE";
export const REMOVE = "[calendario] REMOVE";

export const GET_SUCCESS = "[calendario] GET success";
export const ADD_SUCCESS = "[calendario] ADD success";
export const PATCH_SUCCESS = "[calendario] PATCH success";
export const UPDATE_SUCCESS = "[calendario] UPDATE success";
export const REMOVE_SUCCESS = "[calendario] REMOVE success";

export const GET_ERROR = "[calendario] GET error";
export const ADD_ERROR = "[calendario] ADD error";
export const PATCH_ERROR = "[calendario] PATCH error";
export const UPDATE_ERROR = "[calendario] UPDATE error";
export const REMOVE_ERROR = "[calendario] REMOVE error";

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