import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    FLIPPED_FETCH_SUCCESS,
    FLIPPED_UPDATE,
    FLIPPED_CREATE,
    FLIPPED_CREATE_FAIL,
    FLIPPED_CREATE_SUCCESS,
    FLIPPED_REACTIE_CREATE,
    FLIPPED_REACTIE_CREATE_FAIL,
    FLIPPED_REACTIE_CREATE_SUCCESS,
    FLIPPED_REACTIE_UPDATE
} from './types';

export const flippedUpdate = ({ prop, value }) => {
    return {
        type: FLIPPED_UPDATE,
        payload: { prop, value }
    };
};

export const flippedCreate = ({ inhoud, titel, auteur, beschrijving, reacties, uid }) => {
    return (dispatch) => {
        dispatch({ type: FLIPPED_CREATE });

        if (inhoud && titel && auteur && beschrijving !== undefined) {
            firebase.database().ref(`/modules/${uid}/flipped/`)
            .push({ inhoud, titel, auteur, beschrijving, reacties })
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

export const flippedReactieCreate = ({ naam, reactie, uidModule, uid }) => {
    return (dispatch) => {
         dispatch({ type: FLIPPED_REACTIE_CREATE });
         if (reactie !== undefined) {
             firebase.database().ref(`/modules/${uidModule}/flipped/${uid}/reacties/`)
             .push({ naam, reactie })
             .then(() => flippedReactieCreateSuccess(dispatch));
         } else {
             flippedReactieCreateFail(dispatch);
         }
     };
 };

 const flippedReactieCreateFail = (dispatch) => {
    dispatch({
        type: FLIPPED_REACTIE_CREATE_FAIL
    });
};

const flippedReactieCreateSuccess = (dispatch) => {
    dispatch({
        type: FLIPPED_REACTIE_CREATE_SUCCESS
    });
};

export const flippedReactieUpdate = ({ prop, value }) => {
    return {
        type: FLIPPED_REACTIE_UPDATE,
        payload: { prop, value }
    };
};

export const flippedDelete = ({ uidModule, uidFlipped }) => {
    return () => {
        firebase.database().ref(`/modules/${uidModule}/flipped/${uidFlipped}`)
        .remove()
        .then(() => {
            Actions.pop();
        });
    };
};
