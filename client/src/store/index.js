import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as actionTypes from './actions/actionTypes';
import productsReducer from './reducers/product';
import userLoginReducer from './reducers/user/login';
import userRegisterReducer from './reducers/user/register';
import cartReducer from './reducers/cart';
import checkoutReducer from './reducers/checkout';
import ordersReducer from './reducers/order';
import productDetailReducer from './reducers/productDetail';
import reviewReducer from './reducers/review';

const combinedReducers = combineReducers({
  productsReducer,
  userLoginReducer,
  userRegisterReducer,
  cartReducer,
  checkoutReducer,
  ordersReducer,
  productDetailReducer,
  reviewReducer,
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.USER_LOGOUT) {
    const {  
      productsReducer,
      productDetailReducer,
    } = state;
    state = {
      productsReducer,
      productDetailReducer,
    }
  }
  return combinedReducers(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;