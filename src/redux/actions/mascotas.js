export const GET = "[mascotas] GET";
export const ADD = "[mascotas] ADD";
export const PATCH = "[mascotas] PATCH";
export const UPDATE = "[mascotas] UPDATE";
export const REMOVE = "[mascotas] REMOVE";
export const EDIT = "[mascotas] EDIT"


export const GET_SUCCESS = "[mascotas] GET success";
export const ADD_SUCCESS = "[mascotas] ADD success";
export const PATCH_SUCCESS = "[mascotas] PATCH success";
export const UPDATE_SUCCESS = "[mascotas] UPDATE success";
export const REMOVE_SUCCESS = "[mascotas] REMOVE success";

export const GET_ERROR = "[mascotas] GET error";
export const ADD_ERROR = "[mascotas] ADD error";
export const PATCH_ERROR = "[mascotas] PATCH error";
export const UPDATE_ERROR = "[mascotas] UPDATE error";
export const REMOVE_ERROR = "[mascotas] REMOVE error";




export const get = (options) => ({
    type: GET,
    options: options
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

export const edit = (modo, item) => ({
    type: EDIT,
    item: item || {
        id: 0,
        idUsuario: 0,
        idRaza: 0,
        nombre: "",
        foto: "",
        fechaNacimiento: "",
        activo: true
    },
    modo: modo,
})