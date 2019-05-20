import history from '../../../history';
import axios from 'axios';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.LOADING
    });

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products`
      });

      const { products } = response.data;

      dispatch({
        type: actionTypes.FETCH_PRODUCTS,
        products
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  };
};

export const restockProductById = (productId) => {
  return async dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      return history.push('/login');
    }

    dispatch({
      type: actionTypes.LOADING
    });

    try {
      await axios({
        method: 'PATCH',
        url: `${DEFAULT_URI}/products/${productId}`,
        headers: {
          token,
        },
      });

      fetchProducts()(dispatch);
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  }
}

export const fetchProductsByCategory = categoryId => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/categories/${categoryId}`
      }); 

      const { products } = response.data.category;
  
      dispatch({
        type: actionTypes.FETCH_PRODUCTS,
        products
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  }
};

export const fetchCategories = () => {
  return async dispatch => {
    try {
        const response = await axios({
          method: 'GET',
          url: `${DEFAULT_URI}/categories`
        });
  
        const { categories } = response.data;
  
        dispatch({
          type: actionTypes.FETCH_CATEGORIES,
          categories,
        });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  }
};