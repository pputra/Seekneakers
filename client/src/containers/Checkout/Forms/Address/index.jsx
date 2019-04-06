import React, { Component } from 'react';

import { connect } from 'react-redux';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Address extends Component {
  state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      email: '',
  };

  handleUserInput = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  render() {
    const {
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    } = this.state;
    const { classes, activeStep, handleNext, handleBack } = this.props;

    const inputs = [
      {
        value: name,
        key: 'name',
        type: 'name',
        label: 'name',
      },
      {
        value: street,
        key: 'street',
        type: 'street',
        label: 'street',
      },
      {
        value: city,
        key: 'city',
        type: 'city',
        label: 'city',
      },
      {
        value: state,
        key: 'state',
        type: 'state',
        label: 'state',
      },
      {
        value: zip,
        key: 'zip',
        type: 'zip',
        label: 'zip',
      },
      {
        value: country,
        key: 'country',
        type: 'country',
        label: 'country',
      },
      {
        value: phone,
        key: 'phone',
        type: 'phone',
        label: 'phone',
      },
      {
        value: email,
        key: 'email',
        type: 'email',
        label: 'email',
      }
    ];

    return (
      <Form 
        inputs={inputs}
        activeStep={activeStep}
        handleChange={this.handleUserInput}
        classes={classes}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    );
  };
};

export default connect(null, null)(withStyles(styles)(Address));