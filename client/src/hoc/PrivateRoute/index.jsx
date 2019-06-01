import React, { Component } from 'react';

import history from '../../history';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { DEFAULT_URI } from '../../config';

class PrivateRoute extends Component {
  hasValidToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
      return;
    }

    try {
      await axios({
        method: 'GET',
        url: `${DEFAULT_URI}/auth/user-info`,
        headers: {
          token,
        }
      });

    } catch (err) {
      alert(err.response.data.message);
      localStorage.clear();
      history.push('/login');
    }
  }
  
  componentDidMount() {
    this.hasValidToken();
  }

  render() {
    const {
      path,
      component,
    } = this.props;
    return (
      <Route path={path} component={component} />
    );
  }
}
export default PrivateRoute;