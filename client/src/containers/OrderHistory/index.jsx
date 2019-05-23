import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/order';

import styles from './styles';
import OrderList from '../../components/List/Order';
import { withStyles, Typography } from '@material-ui/core';

class OrderHistory extends Component {
  componentDidMount() {
    const { onFetchOrders } = this.props;
    onFetchOrders();
  }

  render() {
    const {
      classes,
      orders,
    } = this.props;
    const hasEmptyOrder = orders.length === 0;

    return (
      <div className={classes.flexContainer}>
        {hasEmptyOrder ?
          <Typography variant="h6">
            You haven't made any purchase
          </Typography> :
          orders.map((order) => (
            <OrderList
              orderId={order._id}
              date={order.createdAt}
              totalPrice={order.total_price}
              products={order.products}
            />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderHistory));