import {
    GET_SUCCESS,
    GET_ERROR,
    GET
} from "../actions/mascotas";
import {
    ikeMascotasVacunas
} from "../fetchs";


const initialState = {
    entities: null,
    porUsuario: null,
    timeStamp: null,
    errorTimeStamp: null,
    vacunado: -1,
    vacuna: -1

};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET:
            newState.vacunado = action.vacunado
            newState.vacuna = action.vacuna
            break;
        case GET_SUCCESS:

            //filtra por vacunas
            if (newState.vacunado != "X") {
                if (newState.vacunado == "S") {
                    // ver si tiene todas las vacunas
                    if (newState.vacuna == -1) {

                    } else {
                        // ver si tiene una vacuna especifica
                        newState.entities = action.payload.receive.filter(item => {
                            return item.MascotasVacuna.find(v => v.VacunaId == newState.vacuna)
                        })

                    }
                } else {
                    // ver si no tiene vacunas
                    if (newState.vacuna == -1) {
                        newState.entities = action.payload.receive.filter(item => item.MascotasVacuna.length == 0)

                    } else {
                        newState.entities = action.payload.receive.filter(item => {
                            return !item.MascotasVacuna.find(v => v.VacunaId == newState.vacuna)
                        })

                    }
                }
            } else {
                // no hay filtro por vacunas
                newState.entities = action.payload.receive
            }

            newState.porUsuario = newState.entities.reduce((acum, item) => {
                let usuario = acum.find(usu => usu.Id == item.idUsuario)
                if (!usuario) {
                    let newItem = {
                        Id: item.idUsuario,
                        mascotas: []
                    }
                    newItem.mascotas.push(item)
                    acum.push(newItem)
                } else {
                    usuario.mascotas.push(item)
                }
                return acum
            }, [])
            newState.timeStamp = (new Date()).getTime();
            break;

        case GET_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};