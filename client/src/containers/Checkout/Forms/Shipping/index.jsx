import React, { Component } from 'react';

import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

class ShippingForm extends Component {
  render() {
    return (
    <div>
      {JSON.stringify(this.props.availableRates)}
    </div>
    );
  }
};

const mapStateToProps = state => ({
  activeStep: state.checkoutReducer.activeStep,
  availableRates:  state.checkoutReducer.availableRates,
});

export default connect(mapStateToProps, null)(withStyles(null)(ShippingForm));