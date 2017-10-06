import * as types from './../constants/actionTypes';

const InitialState = {
    drawerState: '',    
}

const drawer_reducer = (state = InitialState, action) => {
    switch(action.type) {
        case types.OPEN_DRAWER:
            return { drawerState: 'opened' };
        case types.CLOSE_DRAWER:
            return { drawerState: 'closed' };
        default:
            return state;
    }
}

export default drawer_reducer;