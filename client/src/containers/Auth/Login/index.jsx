import React, { Component } from 'react';

import LoginForm from '../../../components/Forms/Login';
import styles from '../../../components/Forms/Login/styles';
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

  handleLogin = () => {
    //todo
  };

  handleChange = (key, val) => {
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
        <LoginForm 
          classes={classes}
          inputs={inputs}
          foo={this.state.foo}
          handleChange={this.handleChange}
          />
      </div>
    );
  };
};

export default withStyles(styles)(Login);