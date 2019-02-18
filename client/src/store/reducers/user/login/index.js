import * as actionTypes from '../../../actions/actionTypes';

const defaultState = {
  firstName: '',
  lastName: '',
  loading: false,
  errMessage: '',
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.LOGIN_SUCCEED: {
      return {
        ...state,
        loading: false,
        firstName: action.firstName,
        lastName: action.lastName,
        errMessage: '',
      }
    }
    case actionTypes.LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      }
    }
    default :
      return state;
  }
};

export default reducer;