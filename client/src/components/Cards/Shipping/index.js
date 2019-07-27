import React from 'react';

import styles from './styles';
import {
  withStyles,
  Card, 
  CardContent, 
  Typography, 
} from '@material-ui/core';

const ShippingCard = (props) => {
  const {
    classes,
    provider,
    name,
    image,
    estimated_days,
    price,
    duration_terms
  } = props;

  return (
    <Card className={classes.card}>
      <img
        className={classes.image}
        src={image}
        alt={`${provider} logo`}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {provider}
          </Typography>
          <Typography variant="subtitle4" color="textSecondary">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Estimated Days: {estimated_days ? estimated_days : 'Not Available'}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            ${price}
          </Typography>
          <Typography variant="subtitle4" color="textSecondary">
            {duration_terms}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

export default withStyles(styles)(ShippingCard);