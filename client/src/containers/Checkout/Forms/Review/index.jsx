import React, { Component, Fragment } from 'react';

import { withRouter } from 'react-router-dom'
import CartTable from '../../../../components/Tables/Cart';
import styles from './styles';
import { 
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
 } from '@material-ui/core';

class Review extends Component {
   generateList() {
    const { 
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      availableRates,
      chosenRateIndex,
    } = this.props;
    
    const chosenShippingOption = availableRates[chosenRateIndex];

    return [
      name,
      street,
      city,
      state,
      zip,
      country,
      phone,
      email,
      `${chosenShippingOption.provider}: ${chosenShippingOption.name}`,
    ];
  }

  render() {
    const { 
      classes,
      availableRates,
      chosenRateIndex,
      products,
      totalPrice,
      modifyProductQuantityById,
    } = this.props;
    const chosenShippingOption = availableRates[chosenRateIndex];
    const shippingPrice = Number(chosenShippingOption.price) || 0;

    return (
      <Fragment>
        <div className={classes.flexContainer}>
        <Paper className={classes.reviewContent}>
            <Typography variant="h6" className={classes.title}>
              Review Info
            </Typography>
            <List dense={false}>
              {this.generateList().map((val, i) => (
                <ListItem key ={val + i}>
                  <ListItemText
                    primary={val}
                    secondary={false ? 'Secondary text' : null}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>
        <div className={classes.flexContainer}>
          <CartTable 
            products={products}
            totalPrice={totalPrice}
            modifyProductQuantityById={modifyProductQuantityById}
            shippingPrice={shippingPrice}
          />
        </div>
      </Fragment>
    );
  }
}

export default  withRouter(withStyles(styles)(Review));