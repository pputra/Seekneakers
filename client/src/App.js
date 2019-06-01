import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import PrivateRoute from './hoc/PrivateRoute';
import Root from './hoc/Root';
import Dashboard from './containers/Dashboard';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Checkout from './containers/Checkout';
import Cart from './containers/Cart';
import OrderHistory from './containers/OrderHistory';
import ProductDetail from './containers/ProductDetail';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Root>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/product/:productId" component={ProductDetail} />
              <PrivateRoute path="/checkout" component={Checkout} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/order" component={OrderHistory} />
            </Root>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;