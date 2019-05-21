import React, { Component } from 'react';

import { connect } from 'react-redux';
import { modifyProductQuantityById } from '../../store/actions/cart';

import CartTable from '../../components/Tables/Cart';
import styles from './styles';
import { 
  withStyles, 
  Button,
  Typography, 
} from '@material-ui/core';

class Cart extends Component {
  render() {
    const { 
      history,
      classes, 
      products, 
      totalPrice,
      modifyProductQuantityById,
      shippingPrice,
    } = this.props;

    const hasProduct = products.length !== 0;

    if (hasProduct) {
      return (
        <div className={classes.flexContainer}>
          <CartTable
            products={products}
            totalPrice={totalPrice}
            modifyProductQuantityById={modifyProductQuantityById}
            shippingPrice={shippingPrice}
          />
          <div className={classes.checkoutBtn}>
            <Button
              variant="outlined"
              onClick={() => history.push('/checkout')}
            >
              <h3>Checkout</h3>
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className={classes.flexContainer}>
        <Typography variant="h6">
          Your cart is empty
        </Typography>
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