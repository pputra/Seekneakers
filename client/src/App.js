import React, { Component } from 'react';

import Layout from './hoc/Layout';
import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }
}

export default App;