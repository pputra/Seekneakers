import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  product: '',
  loading: false,
  errMessage: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_DETAIL_LOADING: 
      return {
        ...state,
        loading: true,
        errMessage: '',
      }
    case actionTypes.FETCH_PRODUCT_DETAIL_SUCCEED:
      return {
        ...state,
        product: action.product,
        loading: false,
        errMessage: '',
      }
    case actionTypes.FETCH_CART_FAILED:
      return {
        loading: false,
        errMessage: '',
      }
    case actionTypes.LEAVE_PRODUCT_DETAIL_PAGE:
      return {
        ...defaultState,
      }
    default :
      return state;
  }
};

export default reducer;