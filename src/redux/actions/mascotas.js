export const GET = "[mascotas] GET";
export const GET_SUCCESS = "[mascotas] GET success";
export const GET_ERROR = "[mascotas] GET error";

export const get = (options, vacunado, vacuna) => ({
    type: GET,
    options: options,
    vacunado: vacunado,
    vacuna: vacuna
});