import history from '../../../history';
import axios from 'axios';
import { DEFAULT_URI } from'../../../config'
import * as actionTypes from '../actionTypes';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_LOADING,
    });
    
    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products`,
      });

      const { products } = response.data;

      dispatch({
        type: actionTypes.FETCH_PRODUCTS_SUCCEED,
        products
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_FAILED,
        errMessage: err.response.data.message,
      });
    }
  };
};

export const sortProducts = (sortBy) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_LOADING,
    });

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products?sort_by=${sortBy}`,
      });

      const { products } = response.data;

      dispatch({
        type: actionTypes.FETCH_PRODUCTS_SUCCEED,
        products
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
}

export const fetchProductsByKeywords = keywords => {
  return async dispatch => {
    if (!keywords) {
      dispatch({
        type: actionTypes.FETCH_PRODUCTS_BY_KEYWORDS,
        products: [],
      });
      return;
    }

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products?keywords=${keywords}`
      });

      const { products } = response.data;

      dispatch({
        type: actionTypes.FETCH_PRODUCTS_BY_KEYWORDS,
        products,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ERROR
      });
    }
  }
}

export const selectFilteredProducts = productId => {
  return dispatch => {
    history.push(`/product/${productId}`);
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_BY_KEYWORDS,
      products: [],
    });
  }
}

export const fetchProductDetailByid = productId => {
  return async dispatch => {
    dispatch({
      type: actionTypes.FETCH_PRODUCT_DETAIL_LOADING,
    });

    try {
      const response = await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/products/${productId}`
      });

      const { product } = response.data;

      dispatch({
        type: actionTypes.FETCH_PRODUCT_DETAIL_SUCCEED,
        product,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_PRODUCT_DETAIL_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
}

export const restockProductById = (productId, isFromDetailPage) => {
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

      if (isFromDetailPage) {
        fetchProductDetailByid(productId)(dispatch);
      } else {
        fetchProducts()(dispatch);
      }
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
        type: actionTypes.FETCH_PRODUCTS_SUCCEED,
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

export const leaveProductDetailPage = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_REVIEW_FORM,
    });

    dispatch({
      type: actionTypes.LEAVE_PRODUCT_DETAIL_PAGE,
    });
  }
}