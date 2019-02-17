import React, { Component } from 'react';

import Layout from './hoc/Layout';
import Dashboard from './containers/Dashboard';
import Login from './containers/Auth/Login';

class App extends Component {
  render() {
    return (
      <Layout>
        <Login />
      </Layout>
    );
  }
}

export default App;