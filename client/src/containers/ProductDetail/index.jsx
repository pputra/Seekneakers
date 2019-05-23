import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { withStyles } from '@material-ui/core';

class ProductDetail extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.flexContainer}>
        product detail: {this.props.match.params.id}
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));