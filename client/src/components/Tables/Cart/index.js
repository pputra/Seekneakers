import React from 'react';

import { QuantityOptions } from '../../Options';
import styles from './styles';
import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  FormControl
} from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CartTable = props => {
  const { 
    classes, 
    products, 
    totalPrice,
    modifyProductQuantityById,
    shippingPrice,
  } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell><h3>Product</h3></CustomTableCell>
            <CustomTableCell align="right"><h3>Quantity</h3></CustomTableCell>
            <CustomTableCell align="right"><h3>Price</h3></CustomTableCell>
            <CustomTableCell align="right"><h3>Total</h3></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow className={classes.row} key={product.product_id._id}>
              <CustomTableCell component="th" scope="row">
                <div className={classes.productCol}>
                  <img
                    src={product.product_id.image_src}
                    alt="product"
                    height="50px"
                    width="55px"
                  />
                  <div className={classes.productName}>
                    {product.product_id.name}
                  </div>
                </div>
              </CustomTableCell>
              <CustomTableCell align="right">
                <FormControl>
                  <Select
                    native
                    defaultValue={product.quantity}
                    onChange={({target: {value}}) => 
                      modifyProductQuantityById(product.product_id._id, value)}
                  >
                    <QuantityOptions numStock={product.product_id.stock} />
                  </Select>
                </FormControl>
              </CustomTableCell>
              <CustomTableCell align="right">
                {product.price}
              </CustomTableCell>
              <CustomTableCell align="right">
                {product.price * product.quantity}
              </CustomTableCell>
            </TableRow>
          ))}
          {!!shippingPrice && 
            <TableRow className={classes.row}>
              <CustomTableCell component="th" scope="row">
                <h5>Shipping</h5>
              </CustomTableCell>
              <CustomTableCell align="right" />
              <CustomTableCell align="right" />
              <CustomTableCell align="right">
                {shippingPrice}
              </CustomTableCell>
            </TableRow>
          }
          <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">
              <h3>Sub Total</h3>
            </CustomTableCell>
            <CustomTableCell align="right" />
            <CustomTableCell align="right" />
            <CustomTableCell align="right">
              <h3>
                $
                {!shippingPrice ? 
                  totalPrice : totalPrice + shippingPrice
                }
              </h3>
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(CartTable);