import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom'

import Cart from '../../../Cart';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class Review extends Component {
  render() {
    const { 
      classes,
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      availableRates,
      chooosenRateIndex,
    } = this.props;
    
    const shippingPrice = 30;
    return (
      <Fragment>
        <div className={classes.flexContainer}>
          <div>
            <h1>review contents</h1>
          </div>
        </div>
        <Cart 
          location={this.props.location} 
          shippingPrice={shippingPrice}
        />
      </Fragment>
    );
  }
}

export default  withRouter(withStyles(styles)(Review));