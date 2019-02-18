import React from 'react';

import ProductCard from '../../../components/Cards/Product';
import Grid from '@material-ui/core/Grid';

const Productlist = props => {
  const { products } = props;
  
  return (
    <Grid container spacing={40}>
      {products.map(product => (
        <Grid item key={product._id} sm={6} md={4} lg={3}>
          <ProductCard
            imageSrc={product.image_src}
            brand={product.category_id.name}
            name={product.name}
            price={product.price}
            fn={() => alert(product._id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Productlist;