import { AsyncStorage } from 'react-native'

import * as types from  '../constants/actionTypes.js'

const InitialState = {
    uid: null,
    method: null,
    isLoading: false,
    isSocial: false,
    isCompleted: false,
    profile: {},
    errorMessage: null
}

const auth_reducer = (state = InitialState, action) => {
    switch(action.type){
        case types.SOCIAL_SIGNUP_REQUEST:
            return { ...state, isSocial: true }
        case types.SOCIAL_SIGNUP_FAIL:
            return { ...state, isSocial: false }
        case types.LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case types.LOGIN_SUCCESS:
            return { ...state, uid: action.uid, method: action.method, isLoading: false, profile: action.profile}
        case types.LOGIN_FAIL:
            return { ...state, isLoading: false };
        case types.SIGNUP_REQUEST:
            return { ...state, isLoading: true };
        case types.SIGNUP_SUCCESS:
            return { ...state, uid: action.uid, method: action.method, isLoading: false, isSocial: false, profile: action.profile };
        case types.SIGNUP_FAIL:
            return { ...state, isLoading: false, isSocial: false, errorMessage: action.error };
        case types.SIGNOUT:
            return InitialState;
        case types.COMPLETE_PROFILE_REQUEST:
            return { ...state, isLoading: true };
        case types.COMPLETE_PROFILE:
            return { ...state, isLoading: false, isCompleted: true };
        default:
            return state;
    }
}
export default auth_reducer;