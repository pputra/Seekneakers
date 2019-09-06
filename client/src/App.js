import React, { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import history from './history';
import store from './store';
import PrivateRoute from './hoc/PrivateRoute';
import Root from './hoc/Root';

const Dashboard = lazy(() => import('./containers/Dashboard'));
const Login = lazy(() => import('./containers/Auth/Login'));
const Register = lazy(() => import('./containers/Auth/Register'));
const Checkout = lazy(() => import('./containers/Checkout'));
const Cart = lazy(() => import('./containers/Cart'));
const OrderHistory = lazy(() => import('./containers/OrderHistory'));
const ProductDetail = lazy(() => import('./containers/ProductDetail'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Root>
            <Suspense fallback={<Fallback />}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/product/:productId" component={ProductDetail} />
                <PrivateRoute path="/checkout" component={Checkout} />
                <PrivateRoute path="/cart" component={Cart} />
                <PrivateRoute path="/order" component={OrderHistory} />
              </Switch>
            </Suspense>
          </Root>
        </Router>
      </Provider>
    );
  }
}

const rootStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100px',
};

function Fallback() {
  return (
    <div style={rootStyle}>
      <CircularProgress color="secondary" size={50} thickness={2} />
    </div>
  );
}

export default App;
