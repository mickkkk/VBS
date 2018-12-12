import {
    MODULES_FETCH_SUCCESS,
    REACTIE_CREATE,
    REACTIE_CREATE_FAIL,
    REACTIE_CREATE_SUCCESS,
    REACTIE_UPDATE,
    REACTIES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODULES_FETCH_SUCCESS:
            return action.payload;
        case REACTIE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REACTIE_CREATE:
            return { ...state, error: '' };
        case REACTIE_CREATE_SUCCESS:
            return { ...state };
        case REACTIE_CREATE_FAIL:
            return { ...state, error: 'Reactie plaatsen mislukt' };
        case REACTIES_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
