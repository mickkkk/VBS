import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE
} from '../actions/types';

const INITIAL_STATE = {
    titel: '',
    auteur: '',
    beschrijving: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FLIPPED_FETCH_SUCCESS:
            return action.payload;
        case FLIPPED_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FLIPPED_CREATE:
            return { ...state };
        default:
            return state;
    }
}