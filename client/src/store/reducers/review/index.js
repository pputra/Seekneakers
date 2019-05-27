import * as actionTypes from '../../actions/actionTypes';

const defaultState = {
  loading: false,
  errMessage: '',
  title: '',
  content: '',
  rating: 5,
  currEditId: '',
  editTitle: '',
  editContent:'',
  editRating: 5,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_REVIEW_LOADING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.HANDLE_REVIEW_FORM:
      return {
        ...state,
        [action.key]: action.value,
      }
    case actionTypes.SUBMIT_REVIEW_SUCCEED:
      return {
        ...defaultState,
      }
    case actionTypes.SUBMIT_REVIEW_FAILED:
      return {
        ...state,
        loading: false,
        errMessage: action.errMessage,
      }
    case actionTypes.SET_CURRENT_EDIT_ID:
      return {
        ...state,
        currEditId: action.reviewId,
        editTitle: action.editTitle,
        editContent: action.editContent,
        editRating: action.editRating,
      }
    case actionTypes.RESET_REVIEW_FORM:
      return {
        ...defaultState,
      }
    default :
      return state;
  }
};

export default reducer;