import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from '../../../store/actions/auth';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleLogin = (e) => {
    const { email, password } = this.state;
    const { onLogin } = this.props;

    e.preventDefault();
    
    onLogin(email, password);
  };

  handleUserInput = (key, val) => {
    this.setState({
      [key]: val
    });
  };
  
  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    const inputs = [
      {
        value: email,
        key: 'email',
        type: 'email',
        label: 'email',
      },
      {
        value: password,
        key: 'password',
        type: 'password',
        label: 'password',
      },
    ];

    return (
      <div>
        <Form 
          classes={classes}
          data={inputs}
          handleChange={this.handleUserInput}
          handleSubmit={this.handleLogin}
          />
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login(email, password)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));