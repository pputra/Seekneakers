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

  availableRates: [{"provider":"USPS","name":"Priority Mail Express","image":"https://shippo-static.s3.amazonaws.com/providers/200/USPS.png","estimated_days":1,"duration_terms":"Overnight delivery to most U.S. locations.","price":"46.10"},{"provider":"USPS","name":"Priority Mail","image":"https://shippo-static.s3.amazonaws.com/providers/200/USPS.png","estimated_days":2,"duration_terms":"Delivery within 1, 2, or 3 days based on where your package started and where it’s being sent.","price":"15.28"},{"provider":"USPS","name":"Parcel Select","image":"https://shippo-static.s3.amazonaws.com/providers/200/USPS.png","estimated_days":7,"duration_terms":"Delivery in 2 to 8 days.","price":"14.93"}],
  //availableRates: [],
  chooosenRateIndex: 0,
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