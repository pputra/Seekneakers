import React, { Component } from 'react';

import styles from './Form/styles';
import Form from './Form';
import { withStyles } from '@material-ui/core';

class ShippingForm extends Component {
  render() {
    const { 
      classes,
      availableRates, 
      chosenRateIndex, 
      handleCheckoutForm, 
    } = this.props;
   
    return (
      <Form 
        classes={classes}
        inputs={availableRates}
        chosenRateIndex={chosenRateIndex}
        handleChange={handleCheckoutForm}
      />
    );
  }
};

export default withStyles(styles)(ShippingForm);