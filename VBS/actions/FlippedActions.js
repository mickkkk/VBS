import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE,
    FLIPPED_CREATE_FAIL,
    FLIPPED_CREATE_SUCCESS
} from './types';

export const flippedUpdate = ({ prop, value }) => {
    return {
        type: FLIPPED_UPDATE,
        payload: { prop, value }
    };
};

export const flippedCreate = ({ inhoud, titel, auteur, beschrijving, uid }) => {
    return (dispatch) => {
        dispatch({ type: FLIPPED_CREATE });

        if (inhoud && titel && auteur && beschrijving !== undefined) {
            console.log(titel, 'titel flipped create');
            console.log(auteur, 'auteur flipped create');
            console.log(beschrijving, 'beschrijving flipped create');
            console.log(inhoud, 'inhoud flipped create');
            firebase.database().ref(`/modules/${uid}/flipped/`)
            .push({ inhoud, titel, auteur, beschrijving })
            .then(() => flippedCreateSuccess(dispatch));
        } else {
            flippedCreateFail(dispatch);
        }
    };
};

const flippedCreateFail = (dispatch) => {
    dispatch({
        type: FLIPPED_CREATE_FAIL
    });
};

const flippedCreateSuccess = (dispatch) => {
    dispatch({
        type: FLIPPED_CREATE_SUCCESS
    });

    Actions.pop();
};

export const flippedFetch = (uid) => {
    return (dispatch) => {
        firebase.database().ref(`/modules/${uid}/flipped/`)
            .on('value', snapshot => {
                dispatch({ type: FLIPPED_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
