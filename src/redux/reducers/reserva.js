import {
    GET,
    GET_SUCCESS,
    GET_ERROR
} from "../actions/reserva";


const initialState = {
    entities: [],
    timeStamp: null
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case GET:
            newState.entities = [{ tiene: "S" }];
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_SUCCESS:
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
            newState.timeStamp = (new Date()).getTime();
            break;
    }
    return newState;
};