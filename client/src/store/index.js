import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/product';

const combinedReducers = combineReducers({
  productsReducer,
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;