import React, { Component } from 'react';

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
    //todo
    //e.preventDefault();
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
        <h1>{this.state.inputs.email.value}</h1>
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

export default withStyles(styles)(Login);