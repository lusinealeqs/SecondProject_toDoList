import request from '../helpers/request';
import * as actionTypes from './userActionTypes';
import { saveJWT, removeJWT, getJWT } from './../helpers/auth';
import {history} from './../helpers/history';
import {loginRequest, registerRequest} from '../helpers/auth';



const apiUrl = process.env.REACT_APP_API_URL;

export function register(data) {
    
    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        registerRequest(data)
            .then(response => {
                dispatch({ type: actionTypes.REGISTER_SUCCESS, userId: response._id });
                history.push('/login');  
            })
            .catch(err => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    }
}

export function login(data) {

    return (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        loginRequest(data)
            .then(token => {
                if (token.message) {
                    throw token
                }

                saveJWT(token);
                //redirection to home page
                dispatch({ type: actionTypes.LOGIN_SUCCESS });
                history.push('/');
            })
            .catch(err => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    }
}

export function logout() {

    return async  (dispatch) => {
        dispatch({ type: actionTypes.AUTH_LOADING });

        request(`${apiUrl}/user/sign-out`, "POST", { jwt: await getJWT() })
            .then(() => {
                removeJWT();
                //redirection to login page
                dispatch({ type: actionTypes.LOGOUT_SUCCESS });
                history.push('/login');
            })
            .catch(err => {
                dispatch({ type: actionTypes.AUTH_ERROR, error: err.message });
            });
    }
} 