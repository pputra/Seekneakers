import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  activeStep: 0,
  loading: false,
  error: false,

  name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: '',
  email: '',

  availableRates: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_STEP: {
      return {
        ...state,
        activeStep: action.currStep,
      }
    }
    case actionTypes.HANDLE_CHECKOUT_FORM: {
      return {
        ...state,
        [action.key]: action.value,
      }
    }
    case actionTypes.SUBMIT_SHIPPING_ADDRESS_SUCCEED: {
      return {
        ...state,
        availableRates: action.availableRates,
        activeStep: state.activeStep + 1,
        loading: false,
        error: false,
      }
    }
    case actionTypes.SUBMIT_ORDER_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case actionTypes.SUBMIT_ORDER_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
      }
    }
    default :
      return state;
  }
};

export default reducer;