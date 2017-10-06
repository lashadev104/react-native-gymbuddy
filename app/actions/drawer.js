import * as types from './../constants/actionTypes';

export const openDrawer = () => {
    return dispatch => {
        dispatch({
            type: types.OPEN_DRAWER,
        })
    }
}

export const closeDrawer = () => {
    return dispatch => {
        dispatch({
            type: types.CLOSE_DRAWER,
        })
    }
}