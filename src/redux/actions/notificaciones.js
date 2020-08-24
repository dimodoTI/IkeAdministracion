export const GET = "[notificaciones] GET";
export const GET_SUCCESS = "[notificaciones] GET success";
export const GET_ERROR = "[notificaciones] GET error";

export const get = (options) => ({
    type: GET,
    options: options,
});