import axios from 'axios';
import { DEFAULT_URI } from '../../../config';
import * as actionTypes from '../actionTypes';
import { fetchProductDetailByid } from '../product'

export const handleReviewForm =  (key, value) => {
  return dispatch => {
    dispatch({
      type: actionTypes.HANDLE_REVIEW_FORM,
      key: key,
      value: value
    });
  };
};

export const submitReview = (data) => {
  return async dispatch => {
    const token = localStorage.getItem('token');

  const {
    productId,
    title,
    content,
    rating,
  } = data;
  
    dispatch({
      type: actionTypes.SUBMIT_REVIEW_LOADING,
    });

    try {
      await axios({
        method: 'POST',
        url: `${DEFAULT_URI}/review/${productId}`,
        headers: {
          token
        },
        data: {
          title,
          content,
          rating
        }
      });

      dispatch({
        type: actionTypes.SUBMIT_REVIEW_SUCCEED,
      });

      fetchProductDetailByid(productId)(dispatch);
    } catch (err) {
      alert(err.response.data.message);
      dispatch({
        type: actionTypes.SUBMIT_REVIEW_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
}

export const deleteReview = (reviewId, productId) => {
  return async dispatch => {
    const token = localStorage.getItem('token');

    dispatch({
      type: actionTypes.SUBMIT_REVIEW_LOADING,
    });

    try {
      await axios({
        method: 'DELETE',
        headers: {
          token,
        },
        url: `${DEFAULT_URI}/review/${reviewId}`
      });

      fetchProductDetailByid(productId)(dispatch);
    } catch (err) {
      alert(err.response.data.message);
      dispatch({
        type: actionTypes.SUBMIT_REVIEW_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
}

export const setCurrentEditId = (reviewId, prevTitle, prevContent, prevRating) => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_CURRENT_EDIT_ID,
      reviewId,
      editTitle: prevTitle,
      editContent: prevContent,
      editRating: prevRating,
    });
  }
}

export const editReview = (data) => {
  return async dispatch => {
    const token = localStorage.getItem('token');

    const {
      productId,
      reviewId,
      title,
      content,
      rating,
    } = data;

    dispatch({
      type: actionTypes.SUBMIT_REVIEW_LOADING,
    });

    try {
      await axios({
        method: 'PUT',
        url: `${DEFAULT_URI}/review/${reviewId}`,
        headers: {
          token
        },
        data: {
          title,
          content,
          rating
        }
      });

      dispatch({
        type: actionTypes.SUBMIT_REVIEW_SUCCEED,
      });

      fetchProductDetailByid(productId)(dispatch);
    } catch (err) {
      alert(err.response.data.message);
      dispatch({
        type: actionTypes.SUBMIT_REVIEW_FAILED,
        errMessage: err.response.data.message,
      });
    }
  }
}

export const cancelEditReview = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.SUBMIT_REVIEW_SUCCEED,
    });
  }
}