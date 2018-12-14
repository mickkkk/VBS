import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE,
    FLIPPED_CREATE_FAIL,
    FLIPPED_CREATE_SUCCESS,
    FLIPPED_REACTIE_CREATE,
    FLIPPED_REACTIE_CREATE_SUCCESS,
    FLIPPED_REACTIE_CREATE_FAIL,
    FLIPPED_REACTIES_FETCH_SUCCESS,
    FLIPPED_REACTIE_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    titel: '',
    auteur: '',
    beschrijving: '',
    inhoud: '',
    reacties: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FLIPPED_FETCH_SUCCESS:
            return action.payload;
        case FLIPPED_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FLIPPED_REACTIE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FLIPPED_CREATE:
            return { ...state, loading: true, error: '' };
        case FLIPPED_CREATE_SUCCESS:
            return { ...state, };
        case FLIPPED_CREATE_FAIL:
            return { ...state, error: 'Artikel plaatsen mislukt', loading: false };
        case FLIPPED_REACTIE_CREATE:
            return { ...state, error: '' };
        case FLIPPED_REACTIE_CREATE_SUCCESS:
            return { ...state };
        case FLIPPED_REACTIE_CREATE_FAIL:
            return { ...state, error: 'Reactie plaatsen mislukt' };
        case FLIPPED_REACTIES_FETCH_SUCCESS:
            return { ...state, reacties: action.payload };
        default:
            return state;
    }
}