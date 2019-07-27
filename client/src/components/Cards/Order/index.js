import React from 'react';

import styles from './styles';
import { 
  withStyles,
  Typography,
  Button,
} from '@material-ui/core';

const OrderCard = props => {
  const {  
    classes,
    history,
    imageSrc,
    name,
    quantity,
    productId,
  } = props;

  return (
    <div className={classes.root}>
      <div>
        <img 
          src={imageSrc}
          alt={name} 
          height="100px" 
          width="100px"
        />
      </div>
      <div className={classes.cardContent}>
        <Typography>
          {name}
        </Typography>
        <Typography>
          Qty: {quantity}
        </Typography>
        <Button size="small"
          onClick={() => history.push(`/product/${productId}`)}
        >
          Leave a Review
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(OrderCard);