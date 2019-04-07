import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
  setActiveStep, 
  handleCheckoutForm, 
  submitShippingAddress, 
} from '../../../../store/actions/checkout';

import Form from './Form';
import styles from './Form/styles';
import withStyles from '@material-ui/core/styles/withStyles';

class Address extends Component {
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

  render() {
    const { 
      classes, 
      activeStep, 
      handleCheckoutForm, 
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      setActiveStep 
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
        activeStep={activeStep}
        selectedCountry={country}
        handleChange={handleCheckoutForm}
        classes={classes}
        handleNext={this.onSubmitAddress}
        handleBack={() => setActiveStep(activeStep - 1)}
      />
    );
  };
};

const mapStateToProps = state => ({
  activeStep: state.checkoutReducer.activeStep,
  name: state.checkoutReducer.name,
  street: state.checkoutReducer.street,
  city: state.checkoutReducer.city,
  state: state.checkoutReducer.state,
  zip: state.checkoutReducer.zip,
  country: state.checkoutReducer.country,
  phone: state.checkoutReducer.phone,
  email: state.checkoutReducer.email,
});

const mapDispatchToProps = dispatch => ({
  setActiveStep: (currStep) => dispatch(setActiveStep(currStep)),
  handleCheckoutForm: (key, value) => dispatch(handleCheckoutForm(key, value)),
  submitShippingAddress: (data) => dispatch(submitShippingAddress(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Address));