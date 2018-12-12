import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    MODULES_FETCH_SUCCESS,
    REACTIE_CREATE,
    REACTIE_CREATE_FAIL,
    REACTIE_CREATE_SUCCESS,
    REACTIE_UPDATE,
    REACTIES_FETCH_SUCCESS
} from './types';

export const modulesFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/modules/')
            .on('value', snapshot => {
                dispatch({ type: MODULES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const reactiesFetch = ({ uid }) => {
    console.log(uid, 'uid reactieFetch');
    return (dispatch) => {
        firebase.database().ref(`/modules/${uid}/reacties/`)
            .on('value', snapshot => {
                dispatch({ type: REACTIES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const reactieUpdate = ({ prop, value }) => {
    return {
        type: REACTIE_UPDATE,
        payload: { prop, value }
    };
};

export const reactieCreate = ({ naam, reactie, uid }) => {
    console.log(reactie, 'reactie '); 
    return (dispatch) => {
         dispatch({ type: REACTIE_CREATE });
         if (reactie !== undefined) {
             firebase.database().ref(`/modules/${uid}/reacties`)
             .push({ naam, reactie })
             .then(() => reactieCreateSuccess(dispatch));
         } else {
             reactieCreateFail(dispatch);
         }
     };
 };

 const reactieCreateFail = (dispatch) => {
     dispatch({
         type: REACTIE_CREATE_FAIL
     });
 };

 const reactieCreateSuccess = (dispatch) => {
     dispatch({
         type: REACTIE_CREATE_SUCCESS
     });

     //Actions.refresh({ key: Actions.moduleDetail({ module: this.props.module }) });
 };
