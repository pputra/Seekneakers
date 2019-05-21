import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import history from './history';
import store from './store';


import Layout from './hoc/Layout';
import Dashboard from './containers/Dashboard';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Checkout from './containers/Checkout';
import Cart from './containers/Cart';
import OrderHistory from './containers/OrderHistory';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/cart" component={Cart} />
              <Route path="/order" component={OrderHistory} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;