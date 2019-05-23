import React from 'react';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ProductCard = props => {
  const { 
    classes, 
    imageSrc, 
    brand, 
    name, 
    price, 
    addProductToCart, 
    restockProduct,
    stock,
    showDetail,
  } = props;
  
  return (
    <Card className={classes.card}>
      <div onClick={showDetail}>
        <CardMedia
          className={classes.cardMedia}
          image={imageSrc}
          title={name}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h5">
            {brand}
          </Typography>
          <Typography>
            {name}
          </Typography>
          <Typography>
            ${price}
          </Typography>
          <Typography>
            Stock:{stock}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        {Number(stock) === 0 ? 
          <Button variant="outlined" fullWidth={true} onClick={() => restockProduct()}>
            restock request
          </Button> :
          <Button variant="outlined" fullWidth={true} onClick={() => addProductToCart()}>
            <Icon color="default">
              <AddShoppingCartIcon />
            </Icon>
          </Button>
        }
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ProductCard);