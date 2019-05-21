import React from 'react';

import OrderCard from '../../Cards/Order';
import styles from './styles';
import {
  withStyles,
  List,
  ListItem,
  Divider,
  Typography,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const OrderList = props => {
  const {
    classes,
    orderId,
    date,
    totalPrice,
    products,
  } = props;
  
  return (
    <Paper className={classes.root}>
      <List>
        <ListItem>
          <Typography>
            ORDER ID {orderId}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            Placed on {date}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            TOTAL ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Purchased Products
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {products.map((product) => (
              <ListItem>
                <OrderCard 
                  imageSrc={product.product_id.image_src}
                  name={product.product_id.name}
                  quantity={product.quantity}
                />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
}

export default withStyles(styles)(OrderList);