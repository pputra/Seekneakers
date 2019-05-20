import axios from 'axios';
import { DEFAULT_URI } from '../../../config';
import * as actionTypes from '../actionTypes';
import { fetchCart } from '../cart';

export const setActiveStep = currStep => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_ACTIVE_STEP,
      currStep : currStep,
    });
  }
}

export const handleCheckoutForm =  (key, value) => {
  return dispatch => {
    dispatch({
      type: actionTypes.HANDLE_CHECKOUT_FORM,
      key: key,
      value: value
    });
  };
};

export const submitShippingAddress = data => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SUBMIT_ORDER_LOADING,
    });

    const {
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    } = data;

    try {
      const { data } = await axios({
        method: 'POST',
        url: `${DEFAULT_URI}/shipping`,
        data: {
          name,
          street,
          city,
          state,
          zip,
          country,
          phone,
          email,
        },
        headers: {
          token: localStorage.getItem('token'),
        }
      });
      
      const { availableRates } = data;

      dispatch({
        type: actionTypes.SUBMIT_SHIPPING_ADDRESS_SUCCEED,
        availableRates,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.SUBMIT_ORDER_FAILED,
      });
    }
  }
}

export const submitOrder = data => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SUBMIT_ORDER_LOADING,
    });

    const {
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      shippingIndex,
    } = data;

    try {
      await axios({
        method: 'POST',
        url: `${DEFAULT_URI}/order`,
        headers: {
          token: localStorage.getItem('token'),
        },
        data: {
          name,
          street,
          city,
          state,
          zip,
          country,
          phone,
          email,
          shippingIndex,
        },
      });

      dispatch({
        type: actionTypes.SUBMIT_ORDER_SUCCEED
      });

      fetchCart()(dispatch);
    } catch (err) {
      dispatch({
        type: actionTypes.SUBMIT_ORDER_FAILED,
      });
    }
  }
}

export const leaveCheckoutPage = () => {
  return dispatch =>  {
    dispatch({
      type: actionTypes.LEAVE_CHECKOUT_PAGE
    });
  }
}