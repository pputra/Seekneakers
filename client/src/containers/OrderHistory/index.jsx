import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/order';

import WithLoading from '../../hoc/WithLoading';
import styles from './styles';
import OrderListComponent from '../../components/List/Order';
import { withStyles, Typography } from '@material-ui/core';

const OrderList = WithLoading(OrderListComponent);

class OrderHistory extends Component {
  componentDidMount() {
    const { onFetchOrders } = this.props;
    onFetchOrders();
  }

  render() {
    const {
      classes,
      orders,
      history,
      isLoading,
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
              isLoading={isLoading}
              orderId={order._id}
              date={order.createdAt}
              totalPrice={order.total_price}
              products={order.products}
              history={history}
            />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders,
  isLoading: state.ordersReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderHistory));