import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const logOut =() => {
  return{
    type:actionTypes.AUTH_LOGOUT
  }
} 

export const checkAuthTimeout = (expireTime) => {
  return dispatch=> {
    setTimeout(() => {
     dispatch(logOut())
    }, expireTime * 1000);
  }
}
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6UTXCg9btatk2OCbMu2RkqposBEs4nHo";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6UTXCg9btatk2OCbMu2RkqposBEs4nHo";
    }
    axios
      .post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
       dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};
