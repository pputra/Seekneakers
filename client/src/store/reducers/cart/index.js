import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  loading: false,
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
  errMessage: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.FETCH_CART_SUCCEED: {
      const { products, total_price } = action.cart;
      let quantity = 0;
      products.forEach((product) => quantity += product.quantity);
      
      return {
        ...state,
        products,
        totalPrice : total_price,
        totalQuantity: quantity,
        loading: false,
        errMessage: '',
      }
    }
    case actionTypes.FETCH_CART_FAILED: {
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage
      }
    }
    default :
      return state;
  }
};

export default reducer;