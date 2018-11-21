import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ModulesReducer from './ModulesReducer';

export default combineReducers({
    auth: AuthReducer,
    modules: ModulesReducer
});
