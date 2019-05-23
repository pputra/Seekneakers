import React from 'react';

import styles from './styles';
import {
  withStyles,
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Icon,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ProductDetail = props => {
  const {
    classes,
    imageSrc,
    name,
    price,
    stock,
    rating,
    description,
    addProductToCartById,
    restockProductById,
  } = props;

  return (
    <Card className={classes.card}>
      <CardMedia 
        component="img"
        image={imageSrc}
        height={'30%'}
        width={'60%'}
      />
      <CardContent>
        <Typography variant="title">{name}</Typography>
        <Typography variant="title">${price}</Typography>
        <Typography variant="subtitle2">stock: {stock}</Typography>
        <Typography variant="subtitle2">avg rating: {rating}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </CardContent>
      <CardContent className={classes.CardContent}>
        {Number(stock) === 0 ?
          <Button variant="outlined" fullWidth={true} onClick={restockProductById}>
            restock request
          </Button> :
          <Button variant="outlined" fullWidth={true} onClick={addProductToCartById}>
            <Icon color="default">
              <AddShoppingCartIcon />
            </Icon>
          </Button>
        }
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ProductDetail);