import axios from 'axios';
import { DEFAULT_URI } from '../../../config';
import * as actionTypes from '../actionTypes';

export const fetchOrders = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.FETCH_ORDERS_LOADING,
    });

    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/order`,
        headers: {
          token,
        }
      });

      const { orders } = response.data;
      
      dispatch({
        type: actionTypes.FETCH_ORDERS_SUCCEED,
        orders,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ORDERS_FAILED,
        errMessage: err.message
      });
    }
  }
};