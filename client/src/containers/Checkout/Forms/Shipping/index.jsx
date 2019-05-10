import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setActiveStep, handleCheckoutForm } from '../../../../store/actions/checkout';
import styles from './Form/styles';
import Form from './Form';
import { withStyles } from '@material-ui/core';

class ShippingForm extends Component {
  render() {
    const { 
      classes,
      activeStep, 
      availableRates, 
      chooosenRateIndex, 
      handleCheckoutForm, 
      setActiveStep, 
    } = this.props;
   
    return (
      <div>
        <Form 
          classes={classes}
          inputs={availableRates}
          chooosenRateIndex={chooosenRateIndex}
          handleChange={handleCheckoutForm}
          handleNext={() => setActiveStep(activeStep + 1)}
          handleBack={() => setActiveStep(activeStep - 1)}
        />
      </div>
    );
  }
};

const mapStateToProps = state => ({
  activeStep: state.checkoutReducer.activeStep,
  availableRates:  state.checkoutReducer.availableRates,
  chooosenRateIndex: state.checkoutReducer.chooosenRateIndex,
});

const mapDispatchToProps = dispatch => ({
  setActiveStep: (currStep) => dispatch(setActiveStep(currStep)),
  handleCheckoutForm: (key, value) => dispatch(handleCheckoutForm(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShippingForm));