import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setActiveStep } from '../../store/actions/checkout';

import styles from './styles';
import AddressForm from './Forms/Address';
import ShippingForm from './Forms/Shipping';
import withStyles from '@material-ui/core/styles/withStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

class Checkout extends Component {
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
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
    const { activeStep } = this.props;
    switch (activeStep) {
      case 0:
        return (
          <AddressForm />
        ); 
      case 1:
        return (
          <ShippingForm />
        ); 
      case 2:
        return ( 
          <div>
            TODO confirmation page here
          </div>
        );
      default:
        return (
          <AddressForm />
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
                  onClick={() => setActiveStep(activeStep + 1)}
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
});

const mapDispatchToProps = dispatch => ({
  setActiveStep: (currStep) => dispatch(setActiveStep(currStep)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Checkout));