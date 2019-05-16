import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setActiveStep,submitShippingAddress, handleCheckoutForm } from '../../store/actions/checkout';

import styles from './styles';
import AddressForm from './Forms/Address';
import ShippingForm from './Forms/Shipping';
import ReviewForm from './Forms/Review';

import { 
  Grid, 
  withStyles, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography,
} from '@material-ui/core';

class Checkout extends Component {
  onSubmitAddress = () => {
    const { 
      submitShippingAddress, 
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    } = this.props;

    const data = { 
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
    };

    submitShippingAddress(data);
  }

  handleNext = () => {
    const { 
      activeStep,
      setActiveStep
    } =this.props
    
    switch (activeStep) {
      case 0:
        this.onSubmitAddress();
        break;
      case 1:
        setActiveStep(activeStep + 1);
        break;
      case 2:
        break;
      default:
        return;
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
    this.props.history.push('/');
  };

  renderStepContent = () => {
    const {
      handleCheckoutForm, 
      activeStep,

      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,

      availableRates,
      chooosenRateIndex
     } = this.props;
    switch (2) {
      case 0:
        return (
          <AddressForm 
            handleCheckoutForm={handleCheckoutForm}
            name={name}
            street={street}
            city={city}
            state={state}
            zip={zip}
            country={country}
            phone={phone}
            email={email}
          />
        ); 
      case 1:
        return (
          <ShippingForm 
            availableRates={availableRates} 
            chooosenRateIndex={chooosenRateIndex}
            handleCheckoutForm={handleCheckoutForm}
          />
        ); 
      case 2:
        return ( 
          <ReviewForm 
            name={name}
            street={street}
            city={city}
            state={state}
            zip={zip}
            country={country}
            phone={phone}
            email={email}
            availableRates={availableRates} 
            chooosenRateIndex={chooosenRateIndex}
          />
        );
      default:
        return (
          <AddressForm 
            handleCheckoutForm={handleCheckoutForm}
            name={name}
            street={street}
            city={city}
            state={state}
            zip={zip}
            country={country}
            phone={phone}
            email={email}
          />
        );
    }
  }

  render() {
    const { classes, activeStep, setActiveStep } = this.props;

    const steps = [
      'Select Address', 
      'Select shipping method', 
      'Order confirmation',
    ];

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={12} justify={'center'}>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>Your order has been placed</Typography>
              <Button onClick={this.handleReset}>Back to home</Button>
            </div>
          ) : (
            <div className={classes.flexContainer}>
              <div className={classes.mainFormContainer}>
                {this.renderStepContent()}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(activeStep - 1)}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  //onClick={() => setActiveStep(activeStep + 1)}
                  onClick={() => this.handleNext()}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  activeStep: state.checkoutReducer.activeStep,
  //address states
  name: state.checkoutReducer.name,
  street: state.checkoutReducer.street,
  city: state.checkoutReducer.city,
  state: state.checkoutReducer.state,
  zip: state.checkoutReducer.zip,
  country: state.checkoutReducer.country,
  phone: state.checkoutReducer.phone,
  email: state.checkoutReducer.email,
  //shipping states
  availableRates:  state.checkoutReducer.availableRates,
  chooosenRateIndex: state.checkoutReducer.chooosenRateIndex,
});

const mapDispatchToProps = dispatch => ({
  setActiveStep: (currStep) => dispatch(setActiveStep(currStep)),
  submitShippingAddress: (data) => dispatch(submitShippingAddress(data)),
  handleCheckoutForm: (key, value) => dispatch(handleCheckoutForm(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));