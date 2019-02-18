import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  products: [],
  categories: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES: {
      return {
        ...state,
        categories: action.categories
      }
    }
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
      }
    default :
      return state;
  }
};

export default reducer;