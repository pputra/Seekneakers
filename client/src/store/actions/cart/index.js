import axios from 'axios';
import { DEFAULT_URI } from '../../../config';
import * as actionTypes from '../actionTypes';

export const fetchCart = () => {
  return async dispatch => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return;
    }
  
    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/cart`,
        headers: {
          token
        }
      });

      const { cart } = response.data;
      
      dispatch({
        type: actionTypes.FETCH_CART_SUCCEED,
        cart
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_CART_FAILED,
        errMessage: err.message
      });
    }
  }
};

export const addProductToCartById = (productId, history) => {
  return async dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      return history.push('/login');
    }

    dispatch({
      type: actionTypes.FETCH_CART_LOADING
    });

    try {
      await axios({
        method: 'PUT',
        url: `${DEFAULT_URI}/cart/${productId}`,
        headers: {
          token
        }
      });

      fetchCart()(dispatch);
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_CART_FAILED,
        errMessage: err.message
      });
    }
  }
}