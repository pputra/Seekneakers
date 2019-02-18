import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from '../../../store/actions/auth';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Login extends Component {
  state = {
    inputs: {
      email: {
        label: 'Email Address',
        value: '',
      },
      password: {
        label: 'Password',
        value: '',
      },
    },
  };

  handleLogin = (e) => {
    const {
      inputs: {
        email,
        password,
      }
    } = this.state;
    const { onLogin } = this.props;
    e.preventDefault();

    onLogin(email.value, password.value);
  };

  handleUserInput = (key, val) => {
    this.setState(({inputs}) => (
      {inputs: {...inputs, [key] : {...inputs[key],value : val}}}
    ));
  };
  
  render() {
    const { inputs } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Form 
          classes={classes}
          inputs={inputs}
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