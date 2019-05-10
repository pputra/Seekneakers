import React, { Component } from 'react';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Address extends Component {
  render() {
    const { 
      classes,  
      handleCheckoutForm, 
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    } = this.props;

    const inputs = [
      {
        value: name,
        key: 'name',
        type: 'name',
        label: 'Full Name',
      },
      {
        value: street,
        key: 'street',
        type: 'street',
        label: 'Street Name',
      },
      {
        value: city,
        key: 'city',
        type: 'city',
        label: 'City',
      },
      {
        value: state,
        key: 'state',
        type: 'state',
        label: 'State',
      },
      {
        value: zip,
        key: 'zip',
        type: 'zip',
        label: 'ZIP Code',
      },
      {
        value: country,
        key: 'country',
        type: 'country',
        label: 'Country',
      },
      {
        value: phone,
        key: 'phone',
        type: 'phone',
        label: 'Phone Number',
      },
      {
        value: email,
        key: 'email',
        type: 'email',
        label: 'Email Address',
      }
    ];

    return (
      <Form 
        inputs={inputs}
        selectedCountry={country}
        handleChange={handleCheckoutForm}
        classes={classes}
      />
    );
  };
};

export default withStyles(styles)(Address);