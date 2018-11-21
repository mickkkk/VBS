import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    MODULES_FETCH_SUCCESS
} from './types';

export const modulesFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/modules/')
            .on('value', snapshot => {
                dispatch({ type: MODULES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
