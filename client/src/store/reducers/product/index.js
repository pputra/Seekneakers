import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  products: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT :
      return {
        ...state,
        products: action.products,
      }
      default :
        return state;
  }
};

export default reducer;