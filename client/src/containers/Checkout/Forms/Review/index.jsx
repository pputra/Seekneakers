import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Cart from '../../../Cart';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class Review extends Component {
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <div className={classes.flexContainer}>
          <div>
            <h1>review contents</h1>
          </div>
        </div>
        <Cart />
      </Fragment>
    );
  }
}

export default connect(null, null)(withStyles(styles)(Review));