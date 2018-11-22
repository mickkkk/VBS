import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ModulesReducer from './ModulesReducer';
import CijfersReducer from './CijfersReducer';

export default combineReducers({
    auth: AuthReducer,
    modules: ModulesReducer,
    cijfers: CijfersReducer
});
