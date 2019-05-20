import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
  setActiveStep, 
  submitShippingAddress, 
  handleCheckoutForm,
  submitOrder,
  leaveCheckoutPage,
} from '../../store/actions/checkout';
import { modifyProductQuantityById } from '../../store/actions/cart';
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

  onSubmitOrder = () => {
    const {
      submitOrder,
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      chosenRateIndex,
    } = this.props;

    const data = {
      submitOrder,
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      shippingIndex: chosenRateIndex,
    };

    submitOrder(data);
  }

  handleNext = () => {
    const { 
      activeStep,
      setActiveStep,
    } =this.props;
    
    switch (activeStep) {
      case 0:
        this.onSubmitAddress();
        break;
      case 1:
        setActiveStep(activeStep + 1);
        break;
      case 2:
        this.onSubmitOrder();
        break;
      default:
        return;
    }
  };

  handleBack = () => {
    const { 
      activeStep,
      setActiveStep,
    } =this.props;

    setActiveStep(activeStep - 1);
  };

  hasEmptyCart = () => {
    const { 
      products,
      history,
      activeStep,
    } = this.props;
    const hasEmptyCart = products.length === 0;
    const onConfirmationPage = activeStep === 3;

    if (hasEmptyCart && !onConfirmationPage) {
      history.push('/');
    }
  }

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
      chosenRateIndex,

      products,
      totalPrice,
      modifyProductQuantityById,
     } = this.props;
     
    switch (activeStep) {
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
            chosenRateIndex={chosenRateIndex}
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
            chosenRateIndex={chosenRateIndex}
            products={products}
            totalPrice={totalPrice}
            modifyProductQuantityById={modifyProductQuantityById}
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

  componentDidMount() {
    this.hasEmptyCart();
  }

  componentDidUpdate() {
    this.hasEmptyCart();
  }

  componentWillUnmount() {
    const { leaveCheckoutPage } = this.props;
    leaveCheckoutPage();
  }

  render() {
    const { 
      classes, 
      activeStep, 
      history,
    } = this.props;

    const steps = [
      'Select Address', 
      'Select Shipping Method', 
      'Review Order',
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
            <div className={classes.flexContainer}>
              <Typography>Your order has been placed</Typography>
              <Button 
                variant="outlined" 
                onClick={() => history.push('/')}
              >
                Back to home
              </Button>
            </div>
          ) : (
            <div className={classes.flexContainer}>
              <div className={classes.mainFormContainer}>
                {this.renderStepContent()}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
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
  chosenRateIndex: state.checkoutReducer.chosenRateIndex,
  //cart states
  products: state.cartReducer.products,
  totalPrice: state.cartReducer.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  setActiveStep: (currStep) => dispatch(setActiveStep(currStep)),
  submitShippingAddress: (data) => dispatch(submitShippingAddress(data)),
  handleCheckoutForm: (key, value) => dispatch(handleCheckoutForm(key, value)),
  submitOrder: (data) => dispatch(submitOrder(data)),
  leaveCheckoutPage: () => dispatch(leaveCheckoutPage()),
  modifyProductQuantityById: (productId, newQuantity) => 
    dispatch(modifyProductQuantityById(productId, newQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));