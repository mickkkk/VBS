import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE,
    FLIPPED_CREATE_FAIL,
    FLIPPED_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    titel: '',
    auteur: '',
    beschrijving: '',
    inhoud: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FLIPPED_FETCH_SUCCESS:
            return action.payload;
        case FLIPPED_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FLIPPED_CREATE:
            return { ...state, loading: true, error: '' };
        case FLIPPED_CREATE_SUCCESS:
            return { ...state, };
        case FLIPPED_CREATE_FAIL:
            return { ...state, error: 'Artikel plaatsen mislukt', loading: false };
        default:
            return state;
    }
}