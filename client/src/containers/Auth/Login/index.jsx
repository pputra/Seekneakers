import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from '../../../store/actions/auth';

import WithLoading from '../../../hoc/WithLoading';
import FormComponent from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

const Form = WithLoading(FormComponent);

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
    const { classes, isLoading } = this.props;
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
          isLoading={isLoading} 
          classes={classes}
          data={inputs}
          handleChange={this.handleUserInput}
          handleSubmit={this.handleLogin}
          />
      </div>
    );
  };
};

const mapStateToProps = state => ({
  isLoading: state.userLoginReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));