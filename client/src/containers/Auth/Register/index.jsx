import React, { Component } from 'react';

import { connect } from 'react-redux';
import { register } from '../../../store/actions/auth';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };

  handleRegister = (e) => {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      passwordRepeat 
    } = this.state;
    const { onRegister } = this.props;

    e.preventDefault();
    
    onRegister(firstName, lastName, email, password, passwordRepeat);
  };

  handleUserInput = (key, val) => {
    this.setState({
      [key]: val
    });
  };
  
  render() {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      passwordRepeat, 
    } = this.state;
    const { classes } = this.props;
    const inputs = [
      {
        value: firstName,
        key: 'firstName',
        type: 'first_name',
        label: 'First Name',
      },
      {
        value: lastName,
        key: 'lastName',
        type: 'last_name',
        label: 'Last Name',
      },
      {
        value: email,
        key: 'email',
        type: 'email',
        label: 'Email',
      },
      {
        value: password,
        key: 'password',
        type: 'password',
        label: 'Password',
      },
      {
        value: passwordRepeat,
        key: 'passwordRepeat',
        type: 'password',
        label: 'Password Repeat',
      },
    ];

    return (
      <div>
        <Form 
          classes={classes}
          data={inputs}
          handleChange={this.handleUserInput}
          handleSubmit={this.handleRegister}
          />
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  onRegister: (
    firstName, lastName, email, password, passwordRepeat) => dispatch(register(
    firstName, lastName, email, password, passwordRepeat
    )),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Register));