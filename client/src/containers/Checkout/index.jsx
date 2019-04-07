import React, { Component } from 'react';

import { connect } from 'react-redux';

import styles from './styles';
import AddressForm from './Forms/Address';
import withStyles from '@material-ui/core/styles/withStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

class Checkout extends Component {
  state = {
    activeStep: 0,
  };

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
    const { activeStep } = this.state
    switch (activeStep) {
      case 0:
        return (
          <AddressForm 
            activeStep={activeStep} 
            handleNext={this.handleNext} 
            handleBack={this.handleBack} 
          />
        ); 
      case 1:
        return (
          <div>
             TODO shipping options here
          </div>
        ); 
      case 2:
        return ( 
          <div>
            TODO confirmation page here
          </div>
        );
      default:
        return (
          <AddressForm 
            activeStep={activeStep} 
            handleNext={this.handleNext} 
            handleBack={this.handleBack} 
          />
        );
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

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
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
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

export default connect(null, null)(withStyles(styles)(Checkout));