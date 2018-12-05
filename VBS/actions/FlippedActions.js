import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE
} from './types';

export const flippedUpdate = ({ prop, value }) => {
    return {
        type: FLIPPED_UPDATE,
        payload: { prop, value }
    };
};

export const flippedCreate = ({ titel, auteur, beschrijving, uid }) => {
    return (dispatch) => {
        firebase.database().ref(`/modules/${uid}/flipped/`)
        .push({ titel, auteur, beschrijving })
        .then(() => {
            dispatch({ type: FLIPPED_CREATE });
            Actions.pop();
    });
    };
};

export const flippedFetch = (uid) => {
    return (dispatch) => {
        firebase.database().ref(`/modules/${uid}/flipped/`)
            .on('value', snapshot => {
                dispatch({ type: FLIPPED_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
