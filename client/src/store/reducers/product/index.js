import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  loading: false,
  products: [],
  categories: [],
  filteredProducts: [],
  errMessage: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case actionTypes.FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.FETCH_PRODUCTS_SUCCEED:
      return {
        ...state,
        products: action.products,
        loading: false,
      }
    case actionTypes.FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
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