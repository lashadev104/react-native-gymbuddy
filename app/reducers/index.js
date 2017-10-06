import { combineReducers } from 'redux'
import auth_reducer from './auth';
import drawer_reducer from './drawer';

export default combineReducers({
    auth: auth_reducer,
    drawer: drawer_reducer,
});