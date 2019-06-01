import axios from 'axios';
import history from '../../../history';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOGIN_LOADING,
    });

    try {
      const response = await axios({
        method: 'POST',
        url: `${DEFAULT_URI}/auth/login`,
        data: {
          email,
          password,
        }
      });

      const { 
        token,
        user_id,
       } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);

      dispatch({
        type: actionTypes.LOGIN_SUCCEED,
      });

      getUserInfo()(dispatch);
      history.push('/');
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
};

export const register = (firstName, lastName, email, password, passwordRepeat) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.REGISTER_LOADING,
    });

    try {
      await axios({
        method: 'POST',
        url: `${DEFAULT_URI}/auth/register`,
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_repeat: passwordRepeat,
        },
      });

      dispatch({
        type: actionTypes.REGISTER_SUCEED,
      });
      
      history.push('/login');
    } catch (err) {
      dispatch({
        type: actionTypes.REGISTER_FAILED
      });
    }
  }
};

export const getUserInfo = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/auth/user-info`,
        headers: {
          token,
        },
      });

      const { first_name, last_name } = response.data.user;

      dispatch({
        type: actionTypes.UPDATE_USER_INFO,
        firstName: first_name,
        lastName: last_name,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.UPDATE_USER_INFO,
        firstName: '',
        lastName: '',
      });
    }
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_LOGOUT
    });
    localStorage.clear();
  }
}