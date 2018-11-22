import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
    CIJFERS_FETCH_SUCCESS
} from './types';

export const cijfersFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/cijfers/')
            .on('value', snapshot => {
                dispatch({ type: CIJFERS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};
