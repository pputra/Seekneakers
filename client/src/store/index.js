import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/product';
import userLoginReducer from './reducers/user/login';

const combinedReducers = combineReducers({
  productsReducer,
  userLoginReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;