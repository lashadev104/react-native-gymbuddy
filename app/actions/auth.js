import * as types from './../constants/actionTypes';
import firebase, { firebaseDB, firebaseApp } from './../config/firebase';
import { Google } from 'expo';

export const loginRequest = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: types.LOGIN_REQUEST
        })
        return new Promise(function(resolve, reject){{
            console.log(email, password);
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then( user => {
                console.log(user);
                const userRef = firebaseDB.child(`users/${user.uid}`);
                userRef.on('value', snapshot => {
                    dispatch({
                        type: types.LOGIN_SUCCESS,
                        uid: user.uid,
                        profile: snapshot.val(),
                        method: 'email'
                    });
                })
                resolve(true);
            })
            .catch(error => {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error: error.message
                });
                reject(error.message);
            })
        }})
    }
}

export const signupRequest = (profileData) => {
    return (dispatch) => {
        dispatch({
            type: types.SIGNUP_REQUEST
        })
        return new Promise(function(resolve, reject){{
            firebaseApp.auth().createUserWithEmailAndPassword(profileData.email, profileData.password)
            .then( user => {
                console.log("firebase signup uid", user.uid);
                const userRef = firebaseDB.child(`users/${user.uid}`);
                userRef.update(profileData);
                dispatch({
                    type: types.SIGNUP_SUCCESS,
                    uid: user.uid,
                    profile: profileData,
                    method: 'email'
                });
                resolve(true);
            })
            .catch(error => {
                dispatch({
                    type: types.SIGNUP_FAIL,
                    error: error.message
                });
                console.log(error.message);
                reject(error.message);
            })
        }})
    }
}

export const completeProfile = (uid, data) => {
    return (dispatch) => {
        dispatch({
            type: types.COMPLETE_PROFILE_REQUEST
        })
        const userRef = firebaseDB.child(`users/${uid}`);
        userRef.update(data);
        dispatch({
            type: types.COMPLETE_PROFILE
        })
    }
}

export const socialSignUpRequest = () => {
    return (dispatch) => {
        dispatch({
            type: types.SOCIAL_SIGNUP_REQUEST
        })
    }
}

export const socialSignUpFail = () => {
    return (dispatch) => {
        dispatch({
            type: types.SOCIAL_SIGNUP_FAIL
        })
    }
}

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: types.SIGNOUT
        })
    }
}