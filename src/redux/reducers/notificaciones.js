import {
    GET_SUCCESS,
    GET_ERROR,
    ADD_SUCCESS,
    ADD_ERROR
} from "../actions/notificaciones";


const initialState = {
    entities: null,
    timeStamp: null,
    addTimeStamp: null,
    errorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
    const newState = {
        ...state
    };

    switch (action.type) {
        case ADD_SUCCESS:
            newState.addTimeStamp = (new Date()).getTime();
            break;
        case GET_SUCCESS:
            newState.entities = action.payload.receive
            newState.timeStamp = (new Date()).getTime();
            break;
        case GET_ERROR:
        case ADD_ERROR:
            newState.errorTimeStamp = (new Date()).getTime();
            break;

    }
    return newState;
};