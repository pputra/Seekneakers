import axios from 'axios';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const login = (email, password) => {
  return async (dispatch) => {
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

      const { token, first_name, last_name } = response.data;
      
      localStorage.setItem('token', token);

      dispatch({
        type: actionTypes.LOGIN_SUCCEED,
        firstName: first_name,
        lastName: last_name,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  }
}