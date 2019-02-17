import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


import Layout from './hoc/Layout';
import Dashboard from './containers/Dashboard';
import Login from './containers/Auth/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;