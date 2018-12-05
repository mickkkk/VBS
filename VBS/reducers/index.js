import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ModulesReducer from './ModulesReducer';
import CijfersReducer from './CijfersReducer';
import FlippedReducer from './FlippedReducer';

export default combineReducers({
    auth: AuthReducer,
    modules: ModulesReducer,
    cijfers: CijfersReducer,
    flipped: FlippedReducer
});
