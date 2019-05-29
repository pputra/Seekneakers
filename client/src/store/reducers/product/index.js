import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  products: [],
  categories: [],
  filteredProducts: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
      }
    case actionTypes.FETCH_PRODUCTS_BY_KEYWORDS:
      return {
        ...state,
        filteredProducts: action.products,
      }
    default :
      return state;
  }
};

export default reducer;