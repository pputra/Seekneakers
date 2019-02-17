import axios from 'axios';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOADING
    });

    try {
      const products = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products`
      });
      
      dispatch({
        type: actionTypes.FETCH_PRODUCT,
        products
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  };
};