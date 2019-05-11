import React, { Component } from 'react';

import { connect } from 'react-redux';
import { modifyProductQuantityById } from '../../store/actions/cart';

import CartTable from '../../components/Tables/Cart';
import styles from './styles';
import { withStyles } from '@material-ui/core';

class Cart extends Component {
  render() {
    const { 
      classes, 
      products, 
      totalPrice
    } = this.props;
    
    return (
      <div className={classes.flexContainer}>
        <CartTable
          products={products}
          totalPrice={totalPrice}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cartReducer.products,
  totalPrice: state.cartReducer.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  modifyProductQuantityById: (productId, newQuantity) => 
    dispatch(modifyProductQuantityById(productId, newQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));