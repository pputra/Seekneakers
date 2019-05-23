import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/product';
import userLoginReducer from './reducers/user/login';
import userRegisterReducer from './reducers/user/register';
import cartReducer from './reducers/cart';
import checkoutReducer from './reducers/checkout';
import ordersReducer from './reducers/order';
import productDetailReducer from './reducers/productDetail';

const combinedReducers = combineReducers({
  productsReducer,
  userLoginReducer,
  userRegisterReducer,
  cartReducer,
  checkoutReducer,
  ordersReducer,
  productDetailReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;