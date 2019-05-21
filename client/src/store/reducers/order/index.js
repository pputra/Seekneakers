import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  loading: false,
  orders: [],
  errMessage: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_LOADING: {
      return {
        ...state,
        loading: true,
        errMessage: '',
      };
    }
    case actionTypes.FETCH_ORDERS_SUCCEED: {
      return {
        ...state,
        orders: action.orders,
        loading: false,
        errMessage: '',
      };
    }
    case actionTypes.FETCH_ORDERS_FAILED: {
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      };
    }
    default:
      return state;
  }
};

export default reducer;