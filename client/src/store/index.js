import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/product';
import userLoginReducer from './reducers/user/login';
import userRegisterReducer from './reducers/user/register';
import cartReducer from './reducers/cart';

const combinedReducers = combineReducers({
  productsReducer,
  userLoginReducer,
  userRegisterReducer,
  cartReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;