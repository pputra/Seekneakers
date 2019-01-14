import React from 'react';

import ProductCard from '../../../components/Cards/Product';
import Grid from '@material-ui/core/Grid';

const Productlist = props => {
  const { products } = props;
  
  return (
    <Grid container spacing={40}>
      {products.map(card => (
        <Grid item key={card} sm={6} md={4} lg={3}>
          <ProductCard
            imageSrc="https://static.highsnobiety.com/wp-content/uploads/2018/02/02184722/favorite-all-black-sneakers-buy-online-01-1200x800.jpg"
            brand="Nike"
            name="Air Force One"
            price={100}
            fn={() => alert('nice')}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Productlist;