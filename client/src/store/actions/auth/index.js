import axios from 'axios';
import history from '../../../history';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOADING
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
        first_name, 
        last_name,
       } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);

      dispatch({
        type: actionTypes.LOGIN_SUCCEED,
        firstName: first_name,
        lastName: last_name,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_FAILED
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
      history.push('/login');
    } catch (err) {
      dispatch({
        type: actionTypes.REGISTER_FAILED
      });
    }
  }
};